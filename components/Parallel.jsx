"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/09/02/Pictures/stray-neighbourhood-dogs-story_e380d8a0-ec8f-11ea-83c1-09a59be16170.jpg",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835366/Stray_dogs.jpeg_tohlf1.webp",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835455/stray-dogs-2023-11-7436d9880d25451a235e39292561ec2b_syumir.avif",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835477/3-0-126336026-GettyImages-1211427920-0_1679835740201_1710695016271_xs6k8l.avif",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835552/images_gh0ntb.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835641/street-puppies-sleeping-one-over-260nw-1591195660_ykkwns.webp",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835717/images_jragau.jpg",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835758/download_po1wig.jpg",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://res.cloudinary.com/du196ag4l/image/upload/v1718835794/images_ixvn5c.jpg",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

const Parallel = () => {
  return <HeroParallax products={products} />;
};

export default Parallel;
