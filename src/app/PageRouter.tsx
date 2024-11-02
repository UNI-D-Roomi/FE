import { Suspense, lazy } from "react";
import {
  BrowserRouter as RootRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppStyles from "./AppStyles";
import AuthRouter from "./AuthRouter";

import { Loading, Header } from "@/entities";
import { PAGE_URL } from "@/configs/path";

const Home = lazy(() => import("@/pages/home/HomePage"));

const SignIn = lazy(() => import("@/pages/auth/signin/SignInPage"));
const SignUp = lazy(() => import("@/pages/auth/signup/SignUpPage"));

const PageRouter = () => (
  <Suspense fallback={<Loading />}>
    <RootRouter>
      <AppStyles />
      <AuthRouter>
        <Routes>
          <Route path={PAGE_URL.SignIn} element={<SignIn />} />
          <Route path={PAGE_URL.SignUp} element={<SignUp />} />
          <Route element={<Header />}>
            <Route path={PAGE_URL.Home} element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to={PAGE_URL.Home} replace />} />
        </Routes>
      </AuthRouter>
    </RootRouter>
  </Suspense>
);

export default PageRouter;
