import dbConnect from "../../../../db/dbConnect";
import TourioPlaces from "../../../../db/models/TourioPlaces";
import Comment from "../../../../db/models/Comment.js";

export default async function handler(request, response) {
  const { id } = request.query;
  try {
    await dbConnect();

    // ADD NEW COMMENT TO COMMENTS AND TO PLACE
    if (request.method === "POST") {
      const newComment = await Comment.create(request.body);

      const updatedPlace = await TourioPlaces.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } },
        { new: true }
      );

      return response.status(201).json({
        message: "Comment added successfully",
        place: updatedPlace,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
