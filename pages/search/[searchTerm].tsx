import { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

import { IUser, Video } from "../../types";
import { BASE_URL } from "@/utils";
import useAuthStore from "@/store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState<boolean>(false);
  const router = useRouter();

  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  // Returns all accounts that match search term
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-4 md:gap-6 mb-4 md:mb-6 mt-10 md:border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-[16px] md:text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-[16px] md:text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, index: number) => (
              <Link key={index} href={`/profile/${user._id}`}>
                <div className="flex gap-2 pb-2 cursor-pointer font-semibold rounded">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                    />
                  </div>
                  <div>
                    <p className="flex items-center font-bold text-primary lowercase">
                      {/* Replace all spaces with not spaces */}
                      {user.userName.replaceAll(" ", "")}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-sm">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:justify-start">
          {videos.length > 0 ? (
            videos.map((video: Video, index: number) => (
              <VideoCard post={video} key={index} />
            ))
          ) : (
            <NoResults text={`No Video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: res.data },
  };
};

export default Search;
