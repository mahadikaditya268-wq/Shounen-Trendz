import connectDB from '@/config/db'
import authSeller from '@/lib/authSeller'
import Product from '@/models/Product'
import { getAuth } from '@clerk/nextjs/server'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function PUT(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const { id, name, description, category, price, offerPrice } = await request.json()

        if (!id || !name || !description || !category || price === undefined || offerPrice === undefined) {
            return NextResponse.json({ success: false, message: 'missing required fields' })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: 'invalid product id' })
        }

        const parsedPrice = Number(price)
        const parsedOfferPrice = Number(offerPrice)

        if (Number.isNaN(parsedPrice) || Number.isNaN(parsedOfferPrice)) {
            return NextResponse.json({ success: false, message: 'invalid price values' })
        }

        await connectDB()

        const product = await Product.findById(id)

        if (!product) {
            return NextResponse.json({ success: false, message: 'product not found' })
        }

        if (product.userId !== userId) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        product.name = name
        product.description = description
        product.category = category
        product.price = parsedPrice
        product.offerPrice = parsedOfferPrice

        await product.save()

        return NextResponse.json({ success: true, message: 'Product updated successfully', product })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}