import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



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

        await Order.create({
            userId,
            address,
            items,
            amount: totalAmount,
            date: Date.now()
        })

        // clear user cart
        user.cartItems = {}
        await user.save()

        return NextResponse.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}