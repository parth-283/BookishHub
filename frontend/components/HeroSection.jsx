import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Images/background-4.jpg')",
      }}
    >
      <div className="h-screen relative isolate px-6 lg:px-8">
        <div className="h-screen mx-auto max-w-2xl py-32 flex justify-center items-center">
          <div className="text-center">
            <div className="hidden sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Your Gateway to a World of Stories{" "}
                <Link href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to BookishHub,
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover a universe of literature, where every page holds a new
              adventure, a new mystery, and a new journey waiting to unfold.
              Dive into captivating stories spanning genres from fantasy to
              romance, from thriller to historical fiction.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
