import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   //* Pretty Cool Callback Functions That Manipulate The Session Data
  //   async session({ session, token }) {
  //     const tag1 =
  //       session.user.name.split(" ").join("").toLocaleLowerCase() +
  //       Math.floor(Math.random() * 90 + 10);
  //     session.user.tag = tag1;
  //     session.user.uid = token.sub;
  //     return session;
  //   },
  // },
  secret: process.env.JWT_SECRET,
});
