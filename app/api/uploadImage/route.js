import { NextResponse } from "next/server";
import multer from "multer";
import cloudinary from "cloudinary";
import connectDB from "@/app/lib/mongodb";
import Image from "@/app/models/image";

// Initialize multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to handle multipart/form-data, used in API route
export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  await connectDB();

  // Promise wrapper for multer upload
  const multerUpload = upload.single("file");
  await new Promise((resolve, reject) => {
    multerUpload(req, {}, (err) => {
      if (err) {
        console.error("Multer upload error:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });

  if (!req.file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const { buffer, originalname } = req.file;

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });

    // Save the image to the database
    await Image.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    return NextResponse.json({ data: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json(
      { error: "Unable to upload file." },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  await connectDB();

  const userId = req.nextUrl.searchParams.get("user");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const images = await Image.find({ user: userId });

    return NextResponse.json({
      images,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
