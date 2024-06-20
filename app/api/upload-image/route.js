import { NextResponse } from "next/server";
import ImageGallery from "@/app/models/image";
import UploadImage from "@/app/upload-image";

export const GET = async () => {
  try {
    const images = await ImageGallery.find();
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const name = formData.get("name");

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const data = await UploadImage(file, "nextjs-cloudinary");

    await ImageGallery.create({
      image_url: data?.secure_url,
      public_id: data?.public_id,
      name: name,
    });

    return NextResponse.json({ msg: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
