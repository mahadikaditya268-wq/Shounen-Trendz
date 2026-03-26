'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {

  const { router, getToken, user } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState('')

  const getImageUrl = (imageItem) => {
    if (typeof imageItem === 'string') {
      return imageItem
    }

    return imageItem?.url || ''
  }

  const fetchSellerProduct = async () => {
    try {

      const token = await getToken()

      const { data } = await axios.get('/api/product/seller-list', { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        setProducts(Array.isArray(data.products) ? data.products : [])
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?')

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(productId)
      const token = await getToken()
      const { data } = await axios.delete('/api/product/delete', {
        data: { id: productId },
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        toast.success(data.message)
        setProducts((prev) => prev.filter((item) => item._id !== productId))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setDeletingId('')
    }
  }

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user])

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-[var(--surface)]">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--ink)]">Product List</h2>
              <p className="text-sm text-[var(--text-muted)]">Manage your listed products in one place.</p>
            </div>
            <button
              onClick={fetchSellerProduct}
              className="px-4 py-2 rounded-md border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-warm)] transition"
            >
              Refresh
            </button>
          </div>

          {products.length === 0 ? (
            <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-card)] p-8 text-center">
              <p className="text-lg font-medium text-[var(--text-primary)]">No products found</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Add a product from the seller dashboard to see it here.</p>
              <button
                onClick={() => router.push('/seller')}
                className="mt-5 px-4 py-2 bg-[var(--ink)] text-white rounded-md text-sm"
              >
                Add Product
              </button>
            </div>
          ) : (
            <div className="w-full overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-card)]">
              <table className="w-full min-w-[760px]">
                <thead className="text-left text-sm border-b border-[var(--border)] bg-[var(--surface-warm)] text-[var(--text-secondary)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[var(--text-secondary)]">
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-[var(--border)] last:border-b-0 align-middle">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="bg-[var(--surface-warm)] rounded p-2 border border-[var(--border)]">
                            <Image
                              src={getImageUrl(product.image?.[0]) || assets.upload_area}
                              alt="product image"
                              className="w-14 h-14 object-cover rounded"
                              width={1280}
                              height={720}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[var(--text-primary)] truncate">{product.name}</p>
                            <p className="text-xs text-[var(--text-muted)] md:hidden">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">${product.offerPrice}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => router.push(`/seller/edit-product/${product._id}`)}
                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md"
                          >
                            Edit
                            <Image className="h-3.5 w-3.5" src={assets.redirect_icon} alt="edit icon" />
                          </button>
                          <button
                            onClick={() => router.push(`/product/${product._id}`)}
                            className="flex items-center gap-1 px-3 py-2 bg-orange-600 text-white rounded-md"
                          >
                            Visit
                            <Image className="h-3.5 w-3.5" src={assets.redirect_icon} alt="visit icon" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            disabled={deletingId === product._id}
                            className="px-3 py-2 bg-red-600 text-white rounded-md disabled:opacity-70"
                          >
                            {deletingId === product._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;