"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";

const page = () => {
  const { revenues, expenses } = useAppSelector((state) => state.incomeSheet);
  console.log(revenues, expenses);

  const revAmountArr = [];
  const expAmountArr = [];

  revenues?.map((entry) => {
    if (entry.debit > 0) {
      revAmountArr.push(entry.debit);
    }
    revAmountArr.push(entry.credit);
  });

  expenses?.map((entry) => {
    if (entry.debit > 0) {
      expAmountArr.push(entry.debit);
    }
    expAmountArr.push(entry.credit);
  });

  const revTotal = revAmountArr?.reduce((a, b) => a + b, 0);
  const expTotal = expAmountArr?.reduce((a, b) => a + b, 0);

  return (
    <div className="w-full ">
      <div className="flex flex-col  items-center">
        <h1 className="text-center text-2xl mt-5 font-bold">Company Name</h1>
        <h3 className="text-xl">Income Sheet</h3>
      </div>

      <table className="flex flex-col justify-center m-10 text-black ">
        <tbody>
          <tr className="grid grid-cols-10 bg-green-300">
            <td className="col-span-8 pl-3 font-bold">Revenues</td>
            <td className="col-span-2 font-bold">Amounts</td>
          </tr>
          {revenues.map((acc) => (
            <tr className="grid grid-cols-10 bg-slate-200">
              <td className="col-span-8 pl-3">{acc.acc_name}</td>
              <td className="col-span-2">
                {acc.debit > 0 ? acc.debit : acc.credit}
              </td>
            </tr>
          ))}
          <tr className="grid grid-cols-10 bg-amber-300">
            <td className="col-span-8 pl-3">Total</td>
            <td className="col-span-2">{revTotal}</td>
          </tr>
          <tr className="grid grid-cols-10 bg-red-300">
            <td className="col-span-8 pl-3 font-bold">Expenses</td>
            <td className="col-span-2 font-bold">Amounts</td>
          </tr>
          {expenses.map((acc) => (
            <tr className="grid grid-cols-10 bg-slate-200">
              <td className="col-span-8 pl-3">{acc.acc_name}</td>
              <td className="col-span-2">
                {acc.debit > 0 ? acc.debit : acc.credit}
              </td>
            </tr>
          ))}
          <tr className="grid grid-cols-10 bg-amber-300">
            <td className="col-span-8 pl-3">Total</td>
            <td className="col-span-2">{expTotal}</td>
          </tr>
          <tr
            className={`grid grid-cols-10 ${
              revTotal - expTotal < 0 ? "bg-red-300" : "bg-purple-300"
            } `}
          >
            <td className="col-span-8 pl-3">Net Income</td>
            <td className="col-span-2">{revTotal - expTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
