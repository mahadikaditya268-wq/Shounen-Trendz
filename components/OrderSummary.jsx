import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/user/get-address', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        setUserAddresses(data.addresses)
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0])
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!user) {
        return toast('Please login to place order', { icon: '⚠️' })
      }
      if (!selectedAddress) {
        return toast.error('Please select an address')
      }

      let cartItemsArray = Object.keys(cartItems).map((key) => ({ product: key, quantity: cartItems[key] }))
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0)

      if (cartItemsArray.length === 0) {
        return toast.error('Cart is empty')
      }

      const token = await getToken()
      const { data } = await axios.post('/api/order/create', {
        address: selectedAddress._id,
        items: cartItemsArray
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        toast.success(data.message)
        setCartItems({})
        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user])

  const subtotal = getCartAmount();
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + tax;

  return (
    <div className="w-full md:w-[420px] bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">Order Summary</h2>
      <div className="w-8 h-[2px] bg-orange-500 mt-2 rounded-full" />

      <div className="mt-8 space-y-7">
        {/* Address Selector */}
        <div>
          <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 block mb-2.5">
            Delivery Address
          </label>
          <div className="relative w-full">
            <button
              className="w-full text-left px-4 py-3 bg-white text-gray-700 text-sm rounded-xl border border-gray-200 hover:border-gray-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-50 transition-all duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="block truncate pr-6">
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-gray-200 shadow-xl shadow-gray-200/50 mt-2 z-10 rounded-xl py-1.5 max-h-60 overflow-y-auto">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-3 text-sm hover:bg-orange-50 cursor-pointer transition-colors duration-200 text-gray-600"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-3 text-sm text-orange-500 font-semibold hover:bg-orange-50 cursor-pointer transition-colors duration-200 border-t border-gray-100 text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 block mb-2.5">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 outline-none px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-50 transition-all duration-200 placeholder:text-gray-300"
            />
            <button className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors duration-300">
              Apply
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Price Breakdown */}
        <div className="space-y-3.5">
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Items ({getCartCount()})</p>
            <p className="font-semibold text-gray-800">{currency}{subtotal}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Shipping</p>
            <p className="font-semibold text-green-600">Free</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-500">Tax (2%)</p>
            <p className="font-semibold text-gray-800">{currency}{tax}</p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="text-base font-bold text-gray-900">Total</p>
            <p className="text-xl font-bold text-gray-900">{currency}{total}</p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={createOrder}
        className="w-full mt-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm tracking-wide uppercase"
      >
        Place Order
      </button>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span className="text-[11px] text-gray-400">Secure checkout · SSL encrypted</span>
      </div>
    </div>
  );
};

export default OrderSummary;
