import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(_auth, _req, _evt) {
    console.log("ok")
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
