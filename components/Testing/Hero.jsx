import React from "react";
import { FlipWords } from "../ui/flip-words";
import { Spotlight } from "../ui/Spotlight";
import Testimonials from "./Testimonials";
import Spark from "../Spark";
const words = ["better", "cute", "beautiful", "modern"];
const Hero = () => {
  return (
    <div className="mt-[-2rem]">
      <div className="h-[50rem] w-full bg-black dark:bg-white  bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex items-center justify-center">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 opacity-75"
          fill="white"
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="">
          <div className="h-[40rem] flex justify-center items-center px-4">
            <div className="text-6xl font-bold mx-auto  text-white ">
              Adopt
              <FlipWords words={words} className="text-white" /> <br />
              dogs from <span className="text-yellow-400">BARKBUDDY</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Spark />
      </div>
    </div>
  );
};

export default Hero;
