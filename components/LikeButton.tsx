import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}
const LikeButton = ({ handleDislike, handleLike, likes }: IProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { userProfile }: any = useAuthStore();

  // Check if the user has already liked the post.
  // When a user likes a post, his userId is attached to the like as a '_ref'
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      return setIsLiked(true);
    }
    setIsLiked(false);

    // Anytime the like changes, execute the block
  }, [filterLikes, likes]);

  return (
    <div className="flex">
      <div className="mb-4 flex gap-2 justify-center items-center cursor-pointer">
        {isLiked ? (
          <div
            onClick={handleDislike}
            className="bg-primary rounded-full p-2  text-[#F51997]"
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div onClick={handleLike} className="bg-primary rounded-full p-2 ">
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length | 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
