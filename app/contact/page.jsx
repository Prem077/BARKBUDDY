import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import image from "@/public/dog.webp";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...........</div>}>
      <div className="min-h-screen flex mt-[-2rem] flex-col md:flex-row">
        <Toaster />
        {/* Left Section */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center bg-black">
          <Image
            src={image}
            alt="Contact"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-white text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg mb-6">
              Get in touch with our team by choosing what kind of services you
              are looking for.
            </p>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded shadow-md flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Send Us a Message
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            We would love to hear from you! Please fill out the form below and
            we will get in touch with you shortly.
          </p>
          <div className="w-full max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
