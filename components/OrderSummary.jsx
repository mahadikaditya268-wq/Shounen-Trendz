import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/user/get-address', { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createOrder = async () => {
    try {
      if (!user) return toast('Please sign in to place an order', { icon: '⚠️' });
      if (!selectedAddress) return toast.error('Please select a delivery address');

      let cartItemsArray = Object.keys(cartItems).map((key) => ({ product: key, quantity: cartItems[key] }));
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0);
      if (cartItemsArray.length === 0) return toast.error('Your cart is empty');

      const token = await getToken();
      const { data } = await axios.post('/api/order/create', {
        address: selectedAddress._id,
        items: cartItemsArray
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        router.push('/order-placed');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchUserAddresses();
  }, [user]);

  const subtotal = getCartAmount();
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + tax;

  return (
    <div className="w-full md:w-[400px] bg-[var(--surface-card)] border border-[var(--border)] rounded-xl p-7 space-y-7 self-start sticky top-28">
      {/* Header */}
      <div>
        <h2 className="heading-display text-2xl text-[var(--ink)]">Order Summary</h2>
        <div className="w-8 h-px bg-[var(--accent)] mt-2" />
      </div>

      {/* Address selector */}
      <div className="space-y-2.5">
        <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--text-muted)] block">
          Delivery Address
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left px-4 py-3.5 bg-[var(--surface-warm)] text-[var(--text-secondary)] text-sm border border-[var(--border-strong)] rounded-lg hover:border-[var(--accent)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-glow)] transition-all duration-200"
          >
            <span className="block truncate pr-8 font-[var(--font-body)]">
              {selectedAddress
                ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}`
                : "Select an address"}
            </span>
            <svg
              className={`w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute w-full bg-[var(--surface-card)] border border-[var(--border-strong)] shadow-xl rounded-xl mt-2 z-20 py-2 max-h-56 overflow-y-auto">
              {userAddresses.map((address, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-warm)] hover:text-[var(--text-primary)] transition-colors"
                  onClick={() => { setSelectedAddress(address); setIsDropdownOpen(false); }}
                >
                  {address.fullName}, {address.area}, {address.city}, {address.state}
                </button>
              ))}
              <button
                onClick={() => router.push("/add-address")}
                className="w-full text-left px-4 py-3 text-sm text-[var(--accent-deep)] font-medium border-t border-[var(--border)] hover:bg-[var(--accent-glow)] transition-colors flex items-center gap-2"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                Add New Address
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Promo code */}
      <div className="space-y-2.5">
        <label className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--text-muted)] block">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="input-premium flex-1 text-sm"
          />
          <button className="px-5 py-3 bg-[var(--ink)] text-white text-[11px] font-medium tracking-[0.1em] uppercase rounded-lg hover:bg-[var(--accent-deep)] transition-colors whitespace-nowrap">
            Apply
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)]" />

      {/* Price breakdown */}
      <div className="space-y-3.5">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-muted)]">Subtotal ({getCartCount()} items)</span>
          <span className="font-medium text-[var(--text-primary)]">{currency}{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-muted)]">Shipping</span>
          <span className="font-medium text-[var(--sage)]">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--text-muted)]">Tax (2%)</span>
          <span className="font-medium text-[var(--text-primary)]">{currency}{tax}</span>
        </div>

        <div className="h-px bg-[var(--border)]" />

        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-[var(--text-primary)]">Total</span>
          <span className="heading-display text-2xl text-[var(--ink)]">{currency}{total}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={createOrder}
        className="w-full py-4 bg-[var(--ink)] text-white text-[12px] font-medium tracking-[0.12em] uppercase rounded-xl hover:bg-[var(--accent-deep)] transition-colors duration-300 flex items-center justify-center gap-3 group"
      >
        <span>Place Order</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          className="transition-transform group-hover:translate-x-1"
        >
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-ghost)]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-ghost)]">
          Secure checkout · SSL encrypted
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
