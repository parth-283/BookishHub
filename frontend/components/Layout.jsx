import React from "react";
import Header from "./Header";
import "rsuite/dist/rsuite-no-reset.min.css";
import { CustomProvider } from "rsuite";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  let isHideFooter = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/signup",
    "/signin",
  ];

  const isFooter = isHideFooter.includes(router.asPath.split("?")[0]);

  return (
    <>
      <div
        className={`${
          isFooter ? "" : "min-h-screen flex flex-col justify-between"
        }`}
      >
        <header>
          <Header />
        </header>
        <div className={`${isFooter ? "" : "min-h-[35rem]"}`}>
          <main>
            {" "}
            <CustomProvider>{children}</CustomProvider>
          </main>
        </div>
        {!isFooter && (
          <div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
