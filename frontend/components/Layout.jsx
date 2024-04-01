import React from "react";
import Header from "./Header";
import "rsuite/dist/rsuite-no-reset.min.css";
import { CustomProvider } from "rsuite";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  let ishideFooter = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/signup",
    "/signin",
  ];

  return (
    <>
      {/* {!ishideFooter.includes(router.asPath) && (
      )} */}
      <div className="min-h-screen flex flex-col justify-between">
        <header>
          <Header />
        </header>
        <div className="min-h-[35rem]">
          <main>
            {" "}
            <CustomProvider>{children}</CustomProvider>
          </main>
        </div>
        {!ishideFooter.includes(router.asPath.split("?")[0]) && (
          <div>
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
