import TourioPlaces from "../../../../db/models/TourioPlaces";
import Comment from "../../../../db/models/Comment";
import dbConnect from "../../../../db/dbConnect";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();

    // GET ALL PLACES
    if (request.method === "GET") {
      const place = await TourioPlaces.findById(id);
      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }
      response.status(200).json(place);
    }

    // UPDATE PLACE BY ID
    if (request.method === "PATCH") {
      const updatedPlace = await TourioPlaces.findByIdAndUpdate(id, request.body);
      response.status(200).json({ message: `${updatedPlace.name} successfully updated` });
    }

    // DELETE PLACE BY ID
    if (request.method === "DELETE") {
      const deletedPlace = await TourioPlaces.findByIdAndDelete(id);
      await Comment.deleteMany({ _id: { $in: deletedPlace.comments } });
      response.status(200).json({ message: `${deletedPlace.name} successfully deleted` });
    }
  } catch (error) {
    console.log(error);
  }
}
