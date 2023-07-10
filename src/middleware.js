import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (!token) return false;

      if (token.role === "inactive") return false;

      if (req.nextUrl.pathname === "/admin" && token.role !== "admin")
        return false;

      return true;
    },
  },
});
