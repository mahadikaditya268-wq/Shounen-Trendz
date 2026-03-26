import { v2 as cloudinary } from "cloudinary";
import { getAuth } from '@clerk/nextjs/server'
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export async function POST(request) {
    try {
        
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json(
                { success: false, message: 'not authorized' },
                { status: 403 }
            )
        }

        const formData = await request.formData()

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');

        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, message: 'no files uploaded' },
                { status: 400 }
            )
        }

        const result = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                return new Promise((resolve,reject)=>{
                    let settled = false
                    const stream = cloudinary.uploader.upload_stream(
                        {resource_type: 'auto'},
                        (error,result) => {
                            if (settled) return
                            settled = true

                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        }
                    )

                    stream.on('error', (streamError) => {
                        if (settled) return
                        settled = true
                        reject(streamError)
                    })

                    stream.end(buffer)
                })
            })
        )

        const image = result.map((item) => ({
            url: item.secure_url,
            publicId: item.public_id,
        }))

        await connectDB()
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            price:Number(price),
            offerPrice:Number(offerPrice),
            image,
            date: Date.now()
        })

        return NextResponse.json({ success: true, message: 'Upload successful', newProduct })


    } catch (error) {
        const message = error?.message || 'Upload failed'
        const httpCode = error?.http_code
        const status = Number.isInteger(httpCode) && httpCode >= 400 && httpCode <= 599 ? httpCode : 500

        return NextResponse.json(
            {
                success: false,
                message,
                ...(httpCode ? { providerStatus: httpCode } : {}),
            },
            { status }
        )
    }
}