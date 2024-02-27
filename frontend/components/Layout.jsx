import React from "react";
import Header from "./Header";
import 'rsuite/dist/rsuite-no-reset.min.css';
import { CustomProvider } from 'rsuite';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <div >
        <main> <CustomProvider>{children}</CustomProvider></main>
      </div>
      <footer>{/* Your footer content */}</footer>
    </>
  );
};

export default Layout;
