import connectDB from '@/config/db'
import authSeller from '@/lib/authSeller'
import Product from '@/models/Product'
import { getAuth } from '@clerk/nextjs/server'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ success: false, message: 'invalid product id' })
        }

        await connectDB()

        const product = await Product.findById(params.id)

        if (!product) {
            return NextResponse.json({ success: false, message: 'product not found' })
        }

        if (product.userId !== userId) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        return NextResponse.json({ success: true, product })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}