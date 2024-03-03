import React from "react";
import App from "next/app";
import "tailwindcss/tailwind.css";
import "/styles/main.css";
import Layout from "@/components/Layout";
import NProgress from "nprogress"; //nprogress module
import "/styles/ngprogress.css";
import { Router } from "next/router";
import { SessionProvider } from "next-auth/react";
export default class MyApp extends App {
  render() {
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;

    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    return (
      <SessionProvider session={session} >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    );
  }
}
