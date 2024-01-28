import React from "react";
import Link from "next/link";

const routeLinks = [
  { name: "Journal", link: "/journal" },
  { name: "Ledger", link: "/ledger" },
  { name: "Trial Balance", link: "/trial-balance" },
  { name: "Income Sheet", link: "/income-sheet" },
];

const Sidebar = () => {
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
      </ul>
    </div>
  );
};

export default Sidebar;
