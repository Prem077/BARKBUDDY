import multer from "multer";
import cloudinary from "cloudinary";
import connectDB from "@/app/lib/mongodb";
import Image from "@/app/models/image";

const storage = multer.memoryStorage();
const upload = multer({ storage });

connectDB();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const define = {
  bodyParser: false,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return res.status(500).json({ error: "Unable to upload file." });
    }

    const { buffer, originalname } = req.file;

    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
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

      return res.json({ data: result.secure_url });
    } catch (error) {
      console.error("Error during file upload:", error);
      return res.status(500).json({ error: "Unable to upload file." });
    }
  });
}
