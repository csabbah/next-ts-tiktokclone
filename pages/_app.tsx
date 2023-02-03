import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Is server side rendering?
  const [isSSR, setIsSSr] = useState<boolean>(true);

  useEffect(() => {
    // If we get to this stage, then it is client side, so set SSR it false
    setIsSSr(false);
  }, []);

  // If we are server side rending, we don't want to show our client
  if (isSSR) return null;

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
