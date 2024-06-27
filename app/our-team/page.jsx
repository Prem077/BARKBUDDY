"use client";
import { motion } from "framer-motion";

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Niraj",
      position: "Project Manager",
      imageUrl:
        "https://res.cloudinary.com/du196ag4l/image/upload/v1719501370/8c245e75-e8ea-4257-b472-668ac5ca5180_a3blr4.jpg",
    },
    {
      name: "Harsh",
      position: "Lead Developer",
      imageUrl:
        "https://res.cloudinary.com/du196ag4l/image/upload/v1719501394/a5717022-3d09-4edc-829a-1dc5f09d01e5_gmjhzl.jpg",
    },
    {
      name: "Pawan",
      position: "Designer",
      imageUrl:
        "https://res.cloudinary.com/du196ag4l/image/upload/v1719501411/2377771a-ab9a-42bf-8f7f-90c4f36854c5_anqcc2.jpg",
    },
    {
      name: "Abhilasha",
      position: "Marketing Specialist",
      imageUrl:
        "https://res.cloudinary.com/du196ag4l/image/upload/v1719501425/e7fb54c4-fb60-4a26-af03-a5738472d6e6_erfat6.jpg",
    },
    {
      name: "Prem",
      position: "Product Manager",
      imageUrl:
        "https://res.cloudinary.com/du196ag4l/image/upload/v1719501441/e643d8da-0f7c-4302-9c0c-b3160deebb38_ltbcgr.jpg",
    },
  ];

  return (
    <div className="-mt-5 bg-gradient-to-br from-black to-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Our Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-lg p-8"
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0px 10px 20px rgba(255, 215, 0, 0.6)", // Golden shadow on hover
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                className="h-48 w-full object-cover rounded-md mb-4"
                src={member.imageUrl}
                alt={member.name}
                whileHover={{ scale: 1.1 }}
              />
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-900">
                  {member.name}
                </p>
                {/* <p className="text-lg text-gray-700">{member.position}</p> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
