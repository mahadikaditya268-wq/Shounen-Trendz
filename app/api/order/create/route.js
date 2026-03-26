import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { buyerEmailHtml, sellerEmailHtml } from "@/emails/orderConfirmation";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";



export async function POST(request) {
    try {

        const { userId } = getAuth(request)
        const { address, items } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB()

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' });
        }

        let user = await User.findById(userId)
        if (!user) {
            const clerkUser = await (await clerkClient()).users.getUser(userId)
            user = await User.create({
                _id: userId,
                name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'User',
                email: clerkUser.emailAddresses?.[0]?.emailAddress || `${userId}@placeholder.local`,
                imageUrl: clerkUser.imageUrl || ''
            })
        }

        // calculate amount using items
        const amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + product.offerPrice * item.quantity;
        }, 0)

        const totalAmount = amount + Math.floor(amount * 0.02)

        const savedOrder = await Order.create({
            userId,
            address,
            items,
            amount: totalAmount,
            date: Date.now()
        })

        // Send both buyer and seller notifications to your own inbox in current setup.
        try {
            const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
            const fromEmail = process.env.ORDER_EMAIL_FROM || 'onboarding@resend.dev'
            const receiverEmail = process.env.SELLER_EMAIL || process.env.RESEND_TEST_EMAIL

            if (!resend) {
                throw new Error('RESEND_API_KEY is missing')
            }

            if (!receiverEmail) {
                throw new Error('SELLER_EMAIL or RESEND_TEST_EMAIL is required')
            }

            const addressDoc = await Address.findById(address)
            const populatedItems = await Promise.all(
                items.map(async (item) => {
                    const product = await Product.findById(item.product)
                    return { ...item, product }
                })
            )

            const emailData = {
                items: populatedItems,
                amount: totalAmount,
                address: addressDoc,
                date: savedOrder.date,
                orderId: savedOrder._id
            }

            const buyerResult = await resend.emails.send({
                from: fromEmail,
                to: receiverEmail,
                subject: 'Your Drop is Locked In - Order Confirmed!',
                html: buyerEmailHtml({ ...emailData, name: user.name || 'Customer' }),
            })

            if (buyerResult?.error) {
                throw new Error(buyerResult.error.message || 'Failed to send buyer email')
            }

            const sellerResult = await resend.emails.send({
                from: fromEmail,
                to: receiverEmail,
                subject: `New Order - $${totalAmount} | ${populatedItems.reduce((a, item) => a + item.quantity, 0)} units`,
                html: sellerEmailHtml(emailData),
            })

            if (sellerResult?.error) {
                throw new Error(sellerResult.error.message || 'Failed to send seller email')
            }

            console.log('Order emails sent to:', receiverEmail)
        } catch (emailError) {
            console.error('Order email send failed:', emailError?.message || emailError)
        }

        // clear user cart
        user.cartItems = {}
        await user.save()

        return NextResponse.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}