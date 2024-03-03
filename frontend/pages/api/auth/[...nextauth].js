import NextAuth from "next-auth";
import { Providers } from 'next-auth/providers';

const options = {
  providers: [
    Providers.Credentials({
      name: "NestJS API", // Provide a name for your custom provider
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your NestJS login API here
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          // If authentication is successful, return user data
          return response.json();
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
