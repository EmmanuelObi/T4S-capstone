import ImageBg from "@/components/ImageBg";
import LoginForm from "@/components/LoginForm";

const page = () => {
  return (
    <div className="md:w-full w-[90vw] mx-auto lg:grid h-dvh lg:grid-cols-2 2xl:h-[800px]">
      <LoginForm />
      <ImageBg />
    </div>
  );
};

export default page;
