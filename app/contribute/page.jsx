import React from "react";
import Link from "next/link";

const Contribute = () => {
  return (
    <div className="min-h-screen mt-[-5rem] bg-gray-100">
      <div className="h-[50rem] w-full bg-black dark:bg-white  bg-grid-small-white/[0.2] dark:bg-grid-small-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="">
          <main className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold text-center text-white mb-8">
              Contribute to <span className="text-indigo-600">BARKBUDDY</span>
            </h1>

            <p className="text-center text-lg text-gray-500 mb-8">
              Recognizing the importance of community support, BARKBUDDY offers
              multiple ways for individuals to contribute to the cause.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/contribute/donate">
                <div className="p-6 bg-white rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-amber-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Donate Money &rarr;
                  </h2>
                  <p className="text-gray-700">
                    Support us financially to help us reach more dogs in need.
                  </p>
                </div>
              </Link>

              <Link href="/contribute/volunteer">
                <div className="p-6 bg-white rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-amber-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Volunteer Your Time &rarr;
                  </h2>
                  <p className="text-gray-700">
                    Join us as a volunteer and make a direct impact on the lives
                    of dogs.
                  </p>
                </div>
              </Link>

              <Link href="/contribute/provide-food">
                <div className="p-6 bg-white rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-amber-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Provide Food &rarr;
                  </h2>
                  <p className="text-gray-700">
                    Donate food to ensure that no dog goes hungry.
                    <span className="text-white invisible">hello world </span>
                  </p>
                </div>
              </Link>

              <Link href="/contribute/offer-expertise">
                <div className="p-6 bg-white rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-amber-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Offer Expertise &rarr;
                  </h2>
                  <p className="text-gray-700">
                    Share your skills in training or veterinary services to help
                    dogs in need.
                  </p>
                </div>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
