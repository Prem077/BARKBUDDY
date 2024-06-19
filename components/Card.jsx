import Link from "next/link";

const Card = ({ dog }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <img
        src={dog.pictureURL}
        alt={dog.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{dog.name}</h2>
        <p className="text-gray-700">Breed: {dog.breed}</p>
        <p className="text-gray-700">Age: {dog.age}</p>
        <p className="text-gray-700">Gender: {dog.gender}</p>

        <Link href={`/adopt-a-dog/dog/${dog._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Adopt Me
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
