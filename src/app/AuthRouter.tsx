import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { getAccess, PAGE_URL, setAccess } from "@/configs";

import { UserService } from "@/services/UserService";

const queryClient = new QueryClient();

const AuthRouter = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { fetchRoomieCurrent } = UserService();

  useEffect(() => {
    const token = getAccess();
    if (token) {
      setAccess(token);
      fetchRoomieCurrent();
    } else navigate(PAGE_URL.SignIn);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AuthRouter;
