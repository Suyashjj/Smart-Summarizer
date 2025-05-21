"use client"

import { cn } from "@/lib/utils";
import { CheckIcon, ArrowRightIcon } from "lucide-react";
import Script from "next/script";
import { useRazorpay } from "@/lib/useRazorpay";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
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

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

type PriceType = {
    name: string;
    price: number;
    description?: string;
    items: string[];
    paymentLink: string;
    priceId: string;
    id: string;
}

const plans = [
    {
      name: 'Basic',
      price: 149, // Exact price as shown on the pricing page
      description: 'For individuals looking for a basic summary service',
      items : ['5 PDF summaries per month', 'Standard processing speed', 'Email support'],
      id: 'basic',
      paymentLink: '',
      priceId: '',
    },
    {
      name: 'Pro',
      price: 249, // Exact price as shown on the pricing page
      description: 'For teams looking for more advanced features',
      items : [
        'Unlimited PDF summaries', 
        'Advanced analytics', 
        '24/7 support',
        'Markdown export',   
      ],
      id: 'pro',
      paymentLink: '',
      priceId: '',
    },
];
  
const PricingCard = ({name, price, description, items, id}: PriceType) => {
  const { handlePayment, isProcessing } = useRazorpay({ id, name, price });

  return (
    <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
      <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl", id === 'pro' && 'border-rose-400 gap-5 border-2')}>
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-2xl lg:text-3xl font-bold capitalize ">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
          <div>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>

        <div>
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4" />
              {item}
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-700 hover:to-rose-400 transition-all duration-300 text-white font-medium py-2 px-4 disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Buy Now"} 
            {!isProcessing && <ArrowRightIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
  
export default function PricingSection() {
  return (
    <section>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}