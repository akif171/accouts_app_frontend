import Link from "next/link";
import { headers } from "next/headers";

export default function Home() {
  const authHeader = headers().get("authorization");

  console.log(authHeader);

  return (
    <div>
      <Link
        className="my-10 mt-10 py-2 px-3 rounded bg-red-300"
        href={"/logout"}
      >
        Logout
      </Link>
    </div>
  );
}
