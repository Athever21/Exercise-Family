import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader";
import { useUser } from "./AuthProvider";
import Loading from "./components/Loading";

const Auth = lazy(() => import("./components/auth/Auth"));
const Main = lazy(() => import("./components/main/Main"));

const App = () => {
  const { user } = useUser() as any;

  return (
    <div>
      {user.username ? (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <Auth />
        </Suspense>
      )}
    </div>
  );
};

export default hot(module)(App);
