import React from "react";
import App from "next/app";
import "tailwindcss/tailwind.css";
import "/styles/main.css";
import Layout from "@/components/Layout";
import NProgress from "nprogress"; //nprogress module
import "/styles/ngprogress.css";
import { Router, useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PageLoader from "@/components/PageLoader";
import "react-datepicker/dist/react-datepicker.css";
import getConfig from "next/config";

export default class MyApp extends App {
  render() {
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;

    const { publicRuntimeConfig } = getConfig();
    const stripePublicKey = `${publicRuntimeConfig.stripePublicKey}`;

    const stripePromise = loadStripe(stripePublicKey, {
      apiVersion: '2023-10-16',
    });

    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    return (
      <SessionProvider session={session}>
        <Elements stripe={stripePromise}>
          {Component.auth ? (
            <Auth>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Auth>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Elements>
      </SessionProvider>
    );
  }
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const restrictedPage = ["/", "/signin", "/signup"];
  const authenticatedPage = ["/profile", "/my-courses"];

  if (status === "loading") {
    return <PageLoader />;
  } else if (status === "authenticated") {
    localStorage.setItem("user", JSON.stringify(session.user));
    if (restrictedPage.includes(router.asPath.split("?")[0])) {
      router.push("/profile");
    }
  } else if (status == "unauthenticated") {
    if (authenticatedPage.includes(router.asPath.split("?")[0])) {
      router.push("/signin");
    }
    localStorage.removeItem("user");
  }

  return children;
}
