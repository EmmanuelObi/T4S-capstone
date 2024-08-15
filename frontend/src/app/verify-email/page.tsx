import ImageBg from "@/components/ImageBg";
import VerifyEmailForm from "@/components/VerifyEmailForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <VerifyEmailForm />
      <ImageBg />
    </div>
  );
};

export default page;
