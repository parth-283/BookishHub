import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Alert from "../Alert";

const VerifyEmail = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const { token } = router.query;

      if (!token) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      try {
        await accountService
          .verifyEmail(token)
          .then((res) => {
            if (res.ok) {
              setIsLoading(false);
              setIsSuccess(true);
            } else {
              setIsLoading(false);
              setIsError(true);
            }
          });
      } catch (error) {
        console.error("Error verifying email:", error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    verifyEmail();
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Verify Email</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-md">
          {isLoading && <p>Loading...</p>}
          {isSuccess && (
            <Alert type="success" message="Email verified successfully." />
          )}
          {isError && <Alert type="error" message="Error verifying email." />}
          <p>
            {isSuccess && (
              <Link className="text-blue-500 hover:underline" href="/signin">
                Go to Sign In
              </Link>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
