import dbConnect from "../../../db/dbConnect";
import Comment from "../../../db/models/Comment.js";

export default async function handler(request, response) {
  try {
    await dbConnect();
    if (request.method === "GET") {
      const comments = await Comment.find();
      return response.status(200).json(comments);
    }
  } catch (e) {
    console.log(e);
  }
}
