import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  const Logout = () => {
    localStorage.clear();
    router.push("/login");
    return;
  };

  const RegisterAndLogout = () => {
    localStorage.clear();
    router.push("/signup");
    return;
  };

  return { Logout, RegisterAndLogout };
};

export default useAuth;
