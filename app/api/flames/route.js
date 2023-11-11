import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("flames");
    const body = await req.json();
    const sharedResult = await db.collection("result").insertOne(body);
    return Response.json({ data: sharedResult.ops[0] });
  } catch (error) {
    return Response.error("Error while sharing link");
  }
}
