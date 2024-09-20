import TourioPlaces from "../../../../db/models/TourioPlaces";
import dbConnect from "../../../../db/dbConnect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await TourioPlaces.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
  response.status(200).json(place);
  }
}
