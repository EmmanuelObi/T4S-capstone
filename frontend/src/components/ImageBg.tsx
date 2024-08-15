import React from "react";
import Image from "next/image";
import { siteAssets } from "@/assets";

const ImageBg = () => {
  return (
    <div className="hidden bg-muted lg:block h-dvh">
      <Image
        src={siteAssets.job2BgImg}
        alt="background job"
        width="1920"
        height="1080"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  );
};

export default ImageBg;
