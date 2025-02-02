import { Suspense } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "../Components/Loader";

const RootLayout = () => {
  return (
    <section className="h-full w-full">
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Outlet />
      </Suspense>
    </section>
  );
};

export default RootLayout;
