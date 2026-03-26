import connectDB from '@/config/db'
import Product from '@/models/Product'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
    try {
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ success: false, message: 'Invalid product id' }, { status: 400 })
        }

        await connectDB()

        const product = await Product.findById(params.id)

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, product })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}
