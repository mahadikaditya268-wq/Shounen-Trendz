'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            
            const token = await getToken()

            const {data} = await axios.get('/api/order/list', {headers:{Authorization:`Bearer ${token}`}})

            if (data.success) {
                setOrders(data.orders)
                setLoading(false)
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
        fetchOrders();
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-8 min-h-screen">
                <div className="space-y-5">
                    <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                        <h2 className="heading-display text-5xl md:text-6xl text-[var(--ink)]">My Orders</h2>
                        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--text-muted)]">Track every drop you copped</p>
                    </div>
                    {loading ? <Loading /> : (<div className="max-w-5xl border-t border-[var(--border)] text-sm">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-[var(--border)] bg-[var(--surface-card)]/60">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover rounded-lg p-2 bg-[var(--surface-alt)]"
                                        src={assets.box_icon}
                                        alt="box_icon"
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base text-[var(--text-primary)]">
                                            {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                        </span>
                                        <span className="text-[var(--text-muted)]">Items : {order.items.length}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[var(--text-secondary)]">
                                        <span className="font-medium">{order.address.fullName}</span>
                                        <br />
                                        <span >{order.address.area}</span>
                                        <br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-semibold my-auto text-[var(--text-primary)]">{currency}{order.amount}</p>
                                <div>
                                    <p className="flex flex-col text-[var(--text-muted)]">
                                        <span>Method : COD</span>
                                        <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                        <span className="text-[var(--accent)]">Payment : Pending</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;