import dbConnect from "../../../db/dbConnect";
import Comment from "../../../db/models/Comment.js";
export default async function handler(request, response) {
  console.log("Database connected successfully");
  try {
    await dbConnect();
    console.log("Database connected successfully");
    if (request.method === "GET") {
      const comments = await Comment.find();
      return response.status(200).json(comments);
    }
  } catch (e) {
    console.log(e);
  }
}
