import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import ExpertiseDonation from "@/app/models/expertise";

export const POST = async (req) => {
  await connectDB();

  try {
    const body = await req.json();
    const { userDetails, date, time, expertise, hours } = body;
    console.log("Received userDetails:", userDetails);

    const volunteering = new ExpertiseDonation({
      user: userDetails.user,
      name: userDetails.name,
      email: userDetails.email,
      date,
      time,
      typeOfExpertise: expertise,
      hours, // Include hours in the new document
    });

    console.log("Prepared expertise contribution:", volunteering);

    await volunteering.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving volunteer contribution:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async (req) => {
  await connectDB();

  const userId = req.nextUrl.searchParams.get("user");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const expertise = await ExpertiseDonation.find({ user: userId });

    return NextResponse.json({
      expertise,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching ExpertiseDonation:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
