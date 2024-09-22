import mongoose from "mongoose";

const { Schema } = mongoose;

const placesSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    mapURL: { type: String, required: true },
    description: { type: String, required: true },
    comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
  },
  { collection: "tourio-places" }
);

const TourioPlaces = mongoose.models.TourioPlaces || mongoose.model("TourioPlaces", placesSchema);

export default TourioPlaces;
