import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


async function refreshAccessToken(token) {
  try {
    // Construct the URL for the refresh token endpoint
    const url = process.env.NEXT_API_BASE_URL + '/auth/refresh-token';

    // Prepare the payload with the refresh token
    const payload = {
      refreshToken: token.refreshToken
    };

    // Send a POST request to the refresh token endpoint
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US',
        'Referer': process.env.REFERER
      },
    });

    // Check if the request was successful
    if (!res.ok) {
      // Throw an error if the request failed
      throw new Error('Failed to refresh access token');
    }

    // Parse the response body as JSON
    const refreshedTokens = await res.json();

    // Return the refreshed tokens, including the new access token and its expiration time,
    // along with the refresh token
    return {
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: refreshedTokens.accessTokenExpires,
      refreshToken: refreshedTokens.refreshToken
    };
  } catch (error) {
    // If an error occurs during the refresh process, log the error and return the original token
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}


// Define your NextAuth options
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
            refreshToken: data.refreshToken,
            email: data.email,
            slug: data.slug,
            expiresIn: data.expiresIn,
            name: data.name,
            callbackUrl: data.callbackUrl,
            redirect: data.redirect,
          };
        } else {
          // If authentication fails, return null
          return null;
        }
      },
    }),
  ],
  secret: process.env.secret,
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    error: "/"
  },
  session: {
    strategy: 'jwt',
    jwt: true,
    maxAge: 7200
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile
    }) {

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + ((user.expiresIn - 60) * 1000),
          name: user.name,
          email: user.email,
          slug: user.slug,
          profilePictureUrl: user.profilePictureUrl,
          isNewUser: user.isNewUser,
          redirect: user.redirect,
          role: user.role
        };
      }

      // Return previous token if the access token has not expired yet
      //console.log("token.accessTokenExpires", token.accessTokenExpires);
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      //console.log("Refresh Call");
      return refreshAccessToken(token)
    },
    async session({
      session,
      token
    }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      session.user.profilePictureUrl = token.profilePictureUrl;
      session.user.redirect = token?.redirectUrl;
      session.user.role = token?.role;
      session.user.email = token?.email;
      session.user.name = token?.name;
      session.user.slug = token?.slug;
      return session;
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
};

// Export a named function instead of an anonymous arrow function
export default function NextAuthHandler(req, res) {
  return NextAuth(req, res, options);
}
