"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const routeLinks = [
  { name: "Journal", link: "/journal" },
  { name: "Ledger", link: "/ledger" },
  { name: "Trial Balance", link: "/trial-balance" },
  { name: "Income Sheet", link: "/income-sheet" },
];

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth-token");

      router.push("/login ");
    }
  };

  return (
    <div className="w-52 h-screen bg-orange-300">
      <Link href="/">
        <h1 className="text-center text-xl mt-3">Accounts</h1>
      </Link>
      <ul className="mt-5">
        {routeLinks.map((route) => (
          <Link href={route.link} className="">
            <li className="p-3 hover:bg-orange-200">{route.name}</li>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="py-2 px-3 rounded bg-yellow-300 ml-5 mt-3"
        >
          LogOut
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
