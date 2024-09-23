import mongoose from "mongoose";
import dbConnect from "../../../db/dbConnect";
import Comment from "../../../db/models/Comment.js";

export default async function handler(request, response) {
  try {
    await dbConnect();

    // GET ALL COMMENTS FROM PLACE BY ID-LIST
    if (request.method === "GET") {
      const { ids, placeId } = request.query;

      if (placeId) {
        const comments = await Comment.find({ placeId });
        return response.status(200).json(comments);
      }

      if (ids) {
        const idsArray = ids.split(",").map((id) => {
          if (id) {
            return new mongoose.Types.ObjectId(id);
          }
        });

        const comments = await Comment.find({
          _id: { $in: idsArray },
        });

        return response.status(200).json(comments);
    }

    return response.status(400).json({ message: "Invalid query parameters." });
  }

  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error.message });
  }
}
