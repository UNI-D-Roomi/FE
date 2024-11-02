import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AuthRouter = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AuthRouter;
