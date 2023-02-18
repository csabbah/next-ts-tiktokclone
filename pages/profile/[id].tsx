import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

import { IUser, Video } from "../../types";
import { BASE_URL } from "@/utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;

  const [showVideos, setShowVideos] = useState<boolean>(true);

  const videos = showVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showVideos ? "border-b-2 border-black" : "text-gray-400";

  const [videosList, setVideosList] = useState<Video[]>([]);

  useEffect(() => {
    if (showVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showVideos, userVideos, userLikedVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-2 bg-white">
        <div className="w-16 h-16 md:w-20 md:w-20">
          <Image
            src={user.image}
            width={80}
            height={80}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex items-center justify-center font-bold text-primary lowercase md:text-2xl tracking-wider">
            {/* Replace all spaces with not spaces */}
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-sm md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-4 md:gap-6 mb-4 md:mb-6 mt-3 md:mt-10 md:border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-[16px] md:text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-[16px] md:text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, index: number) => {
              return <VideoCard post={post} key={index} />;
            })
          ) : (
            <NoResults text={`No ${showVideos ? "" : "Liked"} Videos Yet`} />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};

export default Profile;
