import { allPostsQuery } from "../../../utils/queries";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = allPostsQuery();
    // allPostsQUery is the query itself, it's just in a different file

    // 'client' is our sanity client where we have our projectId and our token
    const data = await client.fetch(query);

    return res.status(200).json(data);
  }
  res.status(400).json({ status: "Something went wrong" });
}
