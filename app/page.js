import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link className="my-10 mt-10 py-2 px-3 rounded bg-red-300" href={"/logout"}>Logout</Link>
    </div>
  );
}
