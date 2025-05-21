import { useState } from "react";

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export function useRazorpay({ id, name, price }: { id: string; name: string; price: number }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: id,
          amount: price,
        }),
      });
      const data = await response.json();
      if (!data.orderId) {
        throw new Error("Failed to create order");
      }
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        amount: price * 100,
        currency: "INR",
        name: "Smart Summarizer",
        description: `Payment for ${name} Plan`,
        order_id: data.orderId,
        handler: function (response: RazorpayResponse) {
          console.log("Payment successful:", response);
          window.location.href = "/";
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#f43f5e",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return { handlePayment, isProcessing };
}
