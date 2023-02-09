import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;

    // setIfMissing will only happen for the FIRST like
    const data = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          // 'after' - At the end, after a string of 'likes[-1]' (The END of the array)
          // We want to pass a unique key, and a ref so we know WHO liked the post
          .insert("after", "likes[-1]", [{ _key: uuid, _ref: userId }])
          // SAVE it
          .commit()
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    // Return that updated post
    res.status(200).json(data);
  }
}
