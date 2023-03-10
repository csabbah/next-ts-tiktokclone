import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { Video } from "../types";
import { NextPage } from "next";

interface IProps {
  post: Video;
}

// This works 'const VideoCard = ({ post }: IProps) => {'
// However, with COMPLICATED types, the below setup is the ideal NextJs setup
const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    // If we have a valid video selected
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
    // This block will be called when we change the value of isVideoMuted
  }, [isVideoMuted]);
  return (
    <div className="flex flex-col border-gray-200 pb-4 sm:pb-6">
      <div>
        <div className="flex gap-2 pb-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  src={post.postedBy.image}
                  className="rounded-full"
                  width={62}
                  height={62}
                  alt="Profile Photo"
                  layout="responsive"
                  priority={true}
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex flex-col items-start">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-4 relative">
        <div
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              playsInline
              ref={videoRef}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] sm:w-[275px] w-[100vw] sm:rounded-2xl cursor-pointer bg-black	"
              loop
              src={`${post.video.asset.url}#t=3`}
            ></video>
          </Link>

          <div className="absolute bottom-1 cursor-pointer flex gap-5 lg:w-[600px] p-3">
            {playing ? (
              <button onClick={onVideoPress}>
                <BsFillPauseFill className="text-white text-2xl lg:text-4xl" />
              </button>
            ) : (
              <button onClick={onVideoPress}>
                <BsFillPlayFill className="text-white text-2xl lg:text-4xl" />
              </button>
            )}
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
