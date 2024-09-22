import dbConnect from "../../../db/dbConnect";
import TourioPlaces from "../../../db/models/TourioPlaces";

export default async function handler(request, response) {
  await dbConnect();
  try {
    if (request.method === "GET") {
      const places = await TourioPlaces.find();
      return response.status(200).json(places);
    }

    if (request.method === "POST") {
      const places = request.body;
      await TourioPlaces.create(places);
      response.status(201).json({ message: "New place added!" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
}
