import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";
import Address from "@/models/Address";
import Product from "@/models/Product";
import { Resend } from "resend";
import { buyerEmailHtml, sellerEmailHtml } from "@/emails/orderConfirmation";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)

// Inngest Function to update user data in database 
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    { event: 'clerk/user.updated' },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
)

// Inngest Function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    { event: 'clerk/user.deleted' },
    async ({event}) => {
        
        const {id } = event.data

        await connectDB()
        await User.findByIdAndDelete(id)
    }
)

// Inngest Function to create user's order in database
export const createUserOrder = inngest.createFunction(
    {
        id:'create-user-order-email'
    },
    {event: 'order/email-notify'},
    async ({event}) => {
        console.log('Inngest email function triggered for orderId:', event?.data?.orderId)
        const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
        const fromEmail = process.env.ORDER_EMAIL_FROM || 'onboarding@resend.dev'
        const sellerEmail = process.env.SELLER_EMAIL
        console.log('Inngest email env check:', {
            hasResendKey: !!process.env.RESEND_API_KEY,
            fromEmail,
            hasSellerEmail: !!sellerEmail
        })

        if (!resend) {
            throw new Error('RESEND_API_KEY is missing in Next.js runtime')
        }

        if (!event?.data?.orderId) {
            throw new Error('orderId is required')
        }

        await connectDB()

        try {
            // Ensure referenced schemas are registered for populate in this runtime.
            void Address
            void Product
            const savedOrder = await Order.findById(event.data.orderId).populate('address items.product')

            if (!savedOrder) {
                throw new Error(`Order not found for id ${event.data.orderId}`)
            }

            const user = await User.findById(savedOrder.userId)

            if (!user?.email && !sellerEmail) {
                throw new Error('No recipient found: user email and SELLER_EMAIL are both missing')
            }

            const emailData = {
                items: savedOrder.items,
                amount: savedOrder.amount,
                address: savedOrder.address,
                date: savedOrder.date,
                orderId: savedOrder._id
            }

            if (user?.email) {
                const buyerResult = await resend.emails.send({
                    from: fromEmail,
                    to: user.email,
                    subject: 'Your Drop is Locked In - Order Confirmed!',
                    html: buyerEmailHtml({ ...emailData, name: user.name || 'Customer' }),
                })

                console.log('Buyer email API response:', buyerResult)

                if (buyerResult?.error) {
                    throw new Error(buyerResult.error.message || 'Failed to send buyer email')
                }
            }

            if (sellerEmail) {
                const sellerResult = await resend.emails.send({
                    from: fromEmail,
                    to: sellerEmail,
                    subject: `New Order - $${savedOrder.amount} | ${savedOrder.items.reduce((a, item) => a + item.quantity, 0)} units`,
                    html: sellerEmailHtml(emailData),
                })

                console.log('Seller email API response:', sellerResult)

                if (sellerResult?.error) {
                    throw new Error(sellerResult.error.message || 'Failed to send seller email')
                }
            }
        } catch (emailError) {
            console.error('Email send failed:', emailError?.message || emailError)
            throw emailError
        }

        return { success: true, processed: 1 };

    }
)