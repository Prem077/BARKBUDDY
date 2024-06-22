import React from "react";
import { FlipWords } from "../ui/flip-words";
import { Spotlight } from "../ui/Spotlight";
import Testimonials from "./Testimonials";
import Spark from "../Spark";
import Image from "next/image";
import img1 from "@/public/adop.jpg";
import img2 from "@/public/images.jpeg";
import img3 from "@/public/kutta.jpeg";
import Link from "next/link";
import Parallel from "../Parallel";

const words = ["better", "cute", "beautiful", "modern"];

const Hero = () => {
  return (
    <div className="mt-[-2rem]">
      <div className="h-[50rem] w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex  justify-center">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 opacity-75"
          fill="white"
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex justify-between bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="">
          <div className="h-[40rem] flex justify-between gap-[5rem] items-center px-4">
            <div className="flex flex-col gap-1">
              <div className="text-6xl font-bold mx-auto text-white">
                Adopt
                <FlipWords words={words} className="text-white" /> <br />
                dogs from <span className="text-yellow-400">BARKBUDDY</span>
              </div>
              <span className="text-white mt-[3rem] text-lg">
                The website aims to facilitate the adoption of stray dogs,
                <br />
                offering a loving shelter and connecting dog-friendly <br />
                individuals while providing comprehensive information on <br />
                available breeds, adoption success stories, health disclosures,{" "}
                <br />
                and videos to promote responsible pet adoption.
              </span>

              <div className="flex gap-5">
                <Link href="/adopt-a-dog">
                  <button className="bg-white text-black  font-bold p-3 px-5 rounded-md mt-5">
                    Adopt Now
                  </button>
                </Link>
                <Link href="/contribute">
                  <button className="bg-black bg-opacity-25 text-white border-2 border-white  font-bold p-3 px-5 rounded-md mt-5">
                    Contribute Now
                  </button>
                </Link>
              </div>
            </div>
            {/* Container for right-aligned text */}
            <div className="text-right pr-4 ">
              <p className="text-white mt-24 bg-black bg-opacity-25 p-5 rounded-md  cursor-pointer hover:scale-110 over:scale-110 transition-transform duration-300 ease-in-out">
                <Image src={img1} alt="img1" className="h-[15rem] w-[35rem]" />
                Take care of the dogs and they will take care of you
              </p>
              <div className="flex justify-center gap-5 mt-5">
                <div className="text-white bg-black bg-opacity-25  p-5 rounded-md cursor-pointer hover:scale-110 over:scale-110 transition-transform duration-300 ease-in-out">
                  <Image
                    src={img2}
                    alt="img2"
                    className="h-[15rem] w-[16rem] rounded-md"
                  />
                  Volunteer to help the dogs
                </div>
                <div className="text-white p-5 bg-black bg-opacity-25  rounded-md cursor-pointer hover:scale-110 over:scale-110 transition-transform duration-300 ease-in-out">
                  <Image
                    src={img3}
                    alt="img3"
                    className="h-[15rem] w-[16rem] rounded-md"
                  />
                  Donate to help the dogs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <Parallel />
      </div>
      <div>
        <Testimonials />
      </div>
      <div className="mt-">
        <Spark />
      </div>
    </div>
  );
};

export default Hero;
