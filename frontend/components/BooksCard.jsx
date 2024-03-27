import React, { useEffect, useState } from "react";
import { booksService } from "@/services/books.service";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dayjs from "dayjs";

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function BooksCard() {
  const [booksBanner, setBooksBanner] = useState([]);
  const { data: session, status } = useSession();

  if (session && status) {
    const { user, accessToken, role } = session;

    // Access user data, access token, and role
  } else {
    // User is not authenticated
  }

  useEffect(() => {
    getBooksBanner();
  }, []);

  const getBooksBanner = async () => {
    await booksService
      .getByRatings()
      .then((res) => {
        setBooksBanner(res);
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
      });
  };

  return (
    <section className="secound-section">
      <div className="py-24 sm:py-32 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover Your Next Read
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore Our Diverse Collection of Books
            </p>
          </div>
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-t-8 border-gray-200 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {booksBanner.map((post) => (
              <article
                key={post?.id}
                className="bg-white rounded flex max-w-lg flex-col p-4 items-start justify-between shadow hover:shadow-lg"
              >
                <div className="rounded">
                  <Image
                    src={
                      post?.image?.secure_url ||
                      "https://source.unsplash.com/400x400/?books"
                    }
                    alt="book card"
                    className="rounded bg-gray-50 h-64	"
                    width={400}
                    height={200}
                  />
                </div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post?.createdAt} className="text-gray-500">
                    {dayjs(post?.createdAt, "MM-DD-YYYY").format(
                      "MMM DD, YYYY"
                    )}
                  </time>
                  {post?.genre && (
                    <Link
                      href={`/book/${post.genre_slug}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-current hover:bg-gray-100"
                    >
                      {post.genre}
                    </Link>
                  )}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/book-detail/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post?.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post?.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <Image
                    src={post?.publisherImage}
                    alt={post?.publisher}
                    className="h-10 w-10 rounded-full bg-gray-50"
                    width={100}
                    height={100}
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href="javascript:void()">
                        <span className="absolute inset-0" />
                        {post?.publisher}
                      </a>
                    </p>
                    <p className="text-gray-600">{post?.editionLanguage}</p>{" "}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
