"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import dog from "@/public/donate.jpg";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [userDetails, setUserDetails] = useState({
    user: "",
    email: "",
    name: "",
    contact: "", // Make sure to add contact if required
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        user: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress, // Extract email correctly
        // contact: user.primaryPhoneNumber, // Add contact if available
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const makePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Are you online?");
      return;
    }

    const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;

    const data = await fetch(`/api/razorpay?amount=${amount}`);
    const { order } = await data.json();

    const options = {
      key: key,
      name: "BARKBUDDY",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "BARKBUDDY Donation",
      handler: async function (response) {
        try {
          const res = await axios.post("/api/donate", {
            userDetails,
            amount,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });

          toast.success("Payment successful! Redirecting to your donations...");
          setTimeout(() => {
            router.push("donate/my-donations");
          }, 1000);
        } catch (error) {
          console.error("Failed to save contribution details", error);
          toast.error("Failed to save contribution details. Please try again.");
        }
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.contact,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment failed. Please try again. Contact support for help");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    makePayment().finally(() => setIsLoading(false));
  };

  return (
    <>
      <Suspense fallback={<div>Loading...........</div>}>
        <div className="min-h-screen mt-[-2rem] flex">
          <Toaster />
          <div className="relative w-1/2 flex items-center justify-center bg-black">
            <Image
              src={dog}
              alt="Dogs in need"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 text-white text-center p-4">
              <h1 className="text-4xl font-bold mb-4">Donate to BARKBUDDY</h1>
              <p className="text-lg mb-6">
                Please donate some money to help these dogs and make their life
                better.
              </p>
              <p className="text-lg">
                Your support is greatly appreciated! Every donation makes a big
                difference in providing food, shelter, and medical care for
                these lovely animals.
              </p>
            </div>
          </div>
          <div className="w-1/2 bg-white p-8 rounded shadow-md flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-2">
              How Your Donation Helps
            </h2>
            <p className="text-gray-700 mb-6">
              By donating, you are giving these dogs a second chance at life.
              Your generosity helps us rescue, rehabilitate, and rehome dogs who
              have been abandoned, neglected, or abused.
            </p>

            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  Donation Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter donation amount"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Donate Now"}
              </button>
            </form>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Payment;
