import dbConnect from "../../../db/dbConnect";
import TourioPlaces from "../../../db/models/TourioPlaces";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await TourioPlaces.find();
    return response.status(200).json(places);
   } 
   
   try {
    if (request.method === "POST") {
      const places = request.body;
      await TourioPlaces.create(places);
      response.status(201).json({message: "New place added!"});
    }
   } catch (error) {
    console.error(error);
    response.status(400).json({message: `Bad Request! Something went wrong ${error.message}`});
   }
}
