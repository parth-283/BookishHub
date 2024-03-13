import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  secret: process.env.secret,
  providers: [
    CredentialsProvider({
      name: "NestJS API", // Provide a name for your custom provider
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your NestJS login API here
        const response = await fetch(
          `${process.env.NEXT_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Return the access token, role, and additional user data
          return {
            accessToken: data.accessToken,
            role: data.role,
            // Add additional user data fields here
            // userId: data.userId,
            // email: data.email,
          };
        } else {
          // If authentication fails, return null
          return null;
        }
      },
    }),
  ],
  // Add any additional configuration options here
};

export default (req, res) => NextAuth(req, res, options);
