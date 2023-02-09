import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  // sub is the unique identifier given from google
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  );

  const { name, picture, sub } = decoded;

  // Every sanity document MUST have an '_id'
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  // Add user to the persistent state
  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
