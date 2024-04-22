import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = Handle_Login_AuthAPICall(
          credentials.email,
          credentials.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/",
    signOut: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("TOKEN: " + JSON.stringify(token));
      console.log("USER" + JSON.stringify(user));
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

const Handle_Login_AuthAPICall = async (formEmail, formPassword) => {
  //event.preventDefault();

  const authBody = {
    email: formEmail,
    password: formPassword,
    action: "login",
  };

  let returnObj = null;

  console.log(authBody);

  const response = await axios.post(
    "https://f2zxw8fu5k.execute-api.ap-south-1.amazonaws.com/TryItMirror/auth",
    authBody
  );

  returnObj = response.data.user;
  console.log(returnObj);

  return returnObj;
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
