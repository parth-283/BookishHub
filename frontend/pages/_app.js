import React from "react";
import App from "next/app";
import "tailwindcss/tailwind.css";
import "/styles/main.css";
import Layout from "@/components/Layout";
import NProgress from "nprogress"; //nprogress module
import "/styles/ngprogress.css";
import { Router } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

export default class MyApp extends App {
  render() {
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());

    return (
      <SessionProvider session={session} >
        <Elements stripe={stripePromise}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Elements>
      </SessionProvider>
    );
  }
}
