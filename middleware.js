// import { deleteCookie } from "cookies-next";
// import { NextResponse } from "next/server";
// // import { headers } from "next/headers";

// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const token = request.cookies.get("auth-token")?.value || "";
//   console.log("token", token);

//   const isPublicPath = path === "/login" || path === "/sign-up";

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/journal", request.nextUrl));
//   }

//   if (path === "/logout") {
//     deleteCookie("auth-token");
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: [
//     "/",
//     "/journal",
//     "/ledger",
//     "/trial-balance",
//     "/income-sheet",
//     "/login",
//     "/sign-up",
//     "/logout",
//   ],
// };
