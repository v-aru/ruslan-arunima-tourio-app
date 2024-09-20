import dbConnect from "../../../db/dbConnect";
import TourioPlaces from "../../../db/models/TourioPlaces";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await TourioPlaces.find();
    return response.status(200).json(places);
   } else {
     return response.status(405).json({message: "Method not allowed!"});
  }
}
