import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";

const Navbar = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            alt="TikTik"
            src={Logo}
            layout="responsive"
          />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {user ? (
          <div>Logged In</div>
        ) : (
          <GoogleLogin
            //createOrGetUser is just a fetch function in our utils that executes a jwt-decode function
            onSuccess={(res) => createOrGetUser(res)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
