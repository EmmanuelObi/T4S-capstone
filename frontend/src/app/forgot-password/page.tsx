import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import ImageBg from "@/components/ImageBg";
import React from "react";

const page = () => {
  return (
    <div className="md:w-full w-[90vw] mx-auto lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <ForgotPasswordForm />
      <ImageBg />
    </div>
  );
};

export default page;
