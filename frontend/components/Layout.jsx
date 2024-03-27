import React from "react";
import Header from "./Header";
import "rsuite/dist/rsuite-no-reset.min.css";
import { CustomProvider } from "rsuite";
import Footer from "./Footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  let ishideHeader = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/signup",
    "/signin",
  ];
  return (
    <>
      {/* {!ishideHeader.includes(router.asPath) && (
      )} */}
      <header>
        <Header />
      </header>
      <div>
        <main>
          {" "}
          <CustomProvider>{children}</CustomProvider>
        </main>
      </div>
      {!ishideHeader.includes(router.asPath) && (
        <div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
