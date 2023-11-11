import clientPromise from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  console.log("params: ", params);
  try {
    const client = await clientPromise;
    const db = client.db("flames");
    const result = await db.collection("result").findOne({
      _id: new mongoose.Types.ObjectId(params.id),
    });
    console.log("result: ", result);
    return Response.json({ data: result });
  } catch (error) {
    console.log("error: ", error);
    return Response.error("Error while fetching result");
  }
}
