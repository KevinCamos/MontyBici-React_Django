import React, { Suspense } from "react";
import { StationsContextProvider } from "./context/StationsContext";
import { UserContextProvider } from "./context/UserContext";
import GuardUser from "./services/Guards/GuardsUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Templates-Suspense/Loading";

export default function MyRouter() {
  const Header = React.lazy(() => import("./components/Header/Header"));
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Register = React.lazy(() => import("./pages/Register/Register"));
  const StationPage = React.lazy(() => import("./pages/Stations/StationPage"));
  const DetailsPage = React.lazy(() => import("./pages/Details/DetailsPage"));
  const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  // const Loading = React.lazy(() => import("./components/Templates-Suspense/Loading"));

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <UserContextProvider>
          <StationsContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Header />}>
                  <Route path="/" element={<GuardUser />}>
                    <Route index element={<StationPage />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/stations" element={<GuardUser />}>
                    <Route index element={<StationPage />} />
                    <Route path="/stations/:slug" element={<DetailsPage />} />
                  </Route>
                  <Route path="/dashboard" element={<GuardUser />}>
                    <Route index element={<Dashboard />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </StationsContextProvider>
        </UserContextProvider>
      </Suspense>
    </>
  );
}
