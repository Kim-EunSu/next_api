import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://EunSu:zcydiDJibDtxOpkn@nextapi.ffspq4w.mongodb.net/?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db("events");

    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find() //컬렉션의 모든문자 가져옴
      .sort({ _id: -1 }) //가장 최신의 댓글이 첫 댓글
      .toArray(); //toArray는 단순히 comments컬렉션의 모든 엔트리를 배열로 제공

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
