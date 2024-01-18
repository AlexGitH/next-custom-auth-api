// this is the same as login
import { COOKIE_NAME } from "../../../constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const MAX_AGE = -1; // to delete cookie immediatelly;

export async function POST(request: Request) {
//   const body = await request.json();

//   const { username, password } = body;

//   console.log('login API',{ username, password });

//   if (username !== "user1@test.io" || password !== "asdf1234") {
//     return NextResponse.json(
//       {
//         message: "Unauthorized",
//       },
//       {
//         status: 401,
//       }
//     );
//   }

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      username: 'test',
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
  });
}