const testimonials = [
  {
    quote:
      "Adopting a dog from the streets of Uttar Pradesh changed my life. From loneliness to companionship, from despair to hope, it was a transformation that I cherish every day.",
    name: "Rajesh Kumar",
    title: "Dog Adopter",
  },
  {
    quote:
      "In Bihar, I found my best friend at the local shelter. Despite the challenges, the joy and love he brings into my life make every hardship worth it.",
    name: "Priya Singh",
    title: "Dog Adopter",
  },
  {
    quote:
      "Jharkhand shelters are full of loving souls waiting for a home. Bringing my dog home from there was the best decision I ever made.",
    name: "Alok Mishra",
    title: "Dog Adopter",
  },
  {
    quote:
      "Walking into the shelter in Uttar Pradesh, I didn't know my heart was about to find its missing piece. Adopting my dog was the beginning of a beautiful journey.",
    name: "Suresh Patel",
    title: "Dog Adopter",
  },
  {
    quote:
      "Bihar shelters are overflowing with dogs who just want a chance to love and be loved. Bringing one home changed our family forever.",
    name: "Anjali Verma",
    title: "Dog Adopter",
  },
  {
    quote:
      "From the streets of Jharkhand to my home, my dog's journey is a testament to resilience and the power of second chances. I'm grateful every day.",
    name: "Amit Kumar",
    title: "Dog Adopter",
  },
  {
    quote:
      "Adopting from Uttar Pradesh taught me that sometimes the greatest friendships are found in the most unexpected places. My dog is proof of that.",
    name: "Pooja Sharma",
    title: "Dog Adopter",
  },
  {
    quote:
      "The decision to adopt from Bihar was the best decision we ever made as a family. Our dog completes us in ways we never imagined possible.",
    name: "Vikram Singh",
    title: "Dog Adopter",
  },
  {
    quote:
      "Bringing home a dog from Jharkhand filled our lives with laughter and love. We can't imagine life without our furry companion.",
    name: "Ritu Gupta",
    title: "Dog Adopter",
  },
];

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const Testimonials = () => {
  return (
    <div className="bg-black ">
      <h1 className="text-white text-4xl font-bold px-8 text-center ">
        Testimonials
      </h1>
      <div className="h-[40rem]  flex flex-col antialiased dark:bg-white bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
};

export default Testimonials;
