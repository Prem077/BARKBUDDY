/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.clerk.com",
      "images.unsplash.com",
      "aceternity.com",
      "images.hindustantimes.com",
      "res.cloudinary.com",
    ], // replace 'example.com' with the actual domain of user.imageUrl
  },
};

export default nextConfig;
