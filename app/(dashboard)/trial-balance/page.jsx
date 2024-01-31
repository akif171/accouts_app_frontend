"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { setData } from "@/lib/features/income-sheet/incomeSheetSlice";

const page = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.incomeSheet);
  console.log(data);
  let bgColor = "";
  const [ledgers, setLedgers] = useState([]);
  const [isRevenue, setIsRevenue] = useState(false);
  const [isExpense, setIsExpense] = useState(false);
  const [reset, setReset] = useState(false);
  const [revenues, setRevenues] = useState(data.revenues);
  const [expenses, setExpenses] = useState(data.expenses);

  const allDebits = [];
  const allCredits = [];

  let debitBalance;
  let creditBalance;

  const handleCheck = (e) => {
    const { value } = e.target;

    if (value === "revenue") {
      setIsRevenue(true);
      setIsExpense(false);
    } else {
      setIsExpense(true);
      setIsRevenue(false);
    }
  };
  
  const handleStatus = (entry) => {
    const rev = revenues.some((r) => r.transId == entry.transId);
    const exp = expenses.some((e) => e.transId == entry.transId);

    if (rev) {
      const filteredRev = revenues.filter((r) => r.transId != entry.transId);
      setRevenues(() => [...filteredRev]);
      return;
    }
    if (exp) {
      const filteredExp = expenses.filter((e) => e.transId != entry.transId);
      setExpenses(() => [...filteredExp]);
      return;
    }
    if (isRevenue) {
      setRevenues((prevIds) => [...prevIds, entry]);
    }
    if (isExpense) {
      setExpenses((prevIds) => [...prevIds, entry]);
    }
  };
  // console.log(bgColor);

  // console.log("revenue", isRevenue);
  // console.log("expense", isExpense);
  useEffect(() => {
    async function fetchLedgers() {
      const res = await fetch("http://localhost:5000/api/ledger");
      const data = await res.json();
      setLedgers(data);
    }
    fetchLedgers();
  }, []);
  // console.log(ledgers);

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl mt-5 font-bold">Trial Balance</h1>
      <div className="flex gap-5 my-5  ml-10">
        <div className="flex gap-3 justify-center items-center">
          <span>Select One : </span>
          <div className="flex gap-1">
            <label>Revenue</label>
            <input
              type="radio"
              value="revenue"
              name="status"
              // checked={isRevenue}
              // defaultChecked
              onChange={(e) => handleCheck(e)}
            />
          </div>
          <div className="flex gap-1">
            <label>Expense</label>
            <input
              type="radio"
              name="status"
              // checked={isExpense}
              value="expense"
              onChange={(e) => handleCheck(e)}
            />
          </div>
        </div>
        <button
          className="py-2 px-3 rounded bg-green-300"
          onClick={() => dispatch(setData({ revenues, expenses }))}
        >
          Submit
        </button>{" "}
      </div>

      <table className="flex flex-col justify-center mt-5 text-black ">
        <thead className=" mx-8  bg-blue-200">
          <tr className="grid grid-cols-12 ">
            <td className="border border-black col-span-1 text-center font-bold">
              Date
            </td>
            <td className="border border-black col-span-6 text-center font-bold">
              Particular
            </td>
            <td className="border border-black col-span-1 text-center font-bold">
              L/F
            </td>
            <td className="border border-black col-span-2 text-center font-bold">
              Debit
            </td>
            <td className="border border-black col-span-2 text-center font-bold">
              Credit
            </td>
          </tr>
        </thead>
        <tbody className=" overflow-y-auto    mx-8  ">
          {ledgers.map((trans) => {
            const debit = trans.transactionIds.filter(
              (entry) => entry.debit.account_name == trans.account_name
            );

            const credit = trans.transactionIds.filter(
              (entry) => entry.credit.account_name == trans.account_name
            );
            const debitAmounts = [];
            const creditAmounts = [];

            const debitAmountArr = debit.map((entry) => {
              debitAmounts.push(Number(entry.debit.amount));
            });
            const creditAmountArr = credit.map((entry) => {
              creditAmounts.push(Number(entry.credit.amount));
            });
            const debitTotal = debitAmounts.reduce((a, b) => a + b, 0);
            const creditTotal = creditAmounts.reduce((a, b) => a + b, 0);

            let total;
            let balance;

            if (debitTotal > creditTotal) {
              total = debitTotal;
              balance = total - creditTotal;
              allDebits.push(balance);
            } else {
              total = creditTotal;
              balance = total - debitTotal;
              allCredits.push(balance);
            }

            debitBalance = allDebits.reduce((a, b) => a + b, 0);
            creditBalance = allCredits.reduce((a, b) => a + b, 0);

            const rev = revenues.some((r) => r.transId == trans._id);
            const exp = expenses.some((e) => e.transId == trans._id);

            // console.log(debitBalance);
            // console.log(creditBalance);

            // console.log(allDebits);
            // console.log(allCredits);

            // console.log(total);
            // console.log(balance);
            return (
              <tr key={trans._id} className="flex flex-col">
                <td
                  onClick={() =>
                    handleStatus({
                      transId: trans._id,
                      acc_name: trans.account_name,
                      debit: debitTotal > creditTotal ? balance : 0,
                      credit: debitTotal < creditTotal ? balance : 0,
                    })
                  }
                  className={`grid grid-cols-12 w-full hover:bg-slate-300 cursor-pointer ${
                    rev ? "bg-green-300" : exp ? "bg-red-300" : ""
                  }`}
                >
                  <div className="border border-black col-span-1 text-center">
                    15-1-2024
                  </div>
                  <div className="border border-black col-span-6 pl-2 ">
                    {trans.account_name}
                  </div>
                  <div className="border border-black col-span-1 text-center"></div>
                  <div className="border border-black col-span-2 text-center">
                    {debitTotal > creditTotal ? balance : "- - -"}
                  </div>
                  <div className="border border-black col-span-2 text-center">
                    {debitTotal < creditTotal ? balance : "- - -"}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="mb-10  mx-8 bg-yellow-300">
          <tr className="grid grid-cols-1">
            <td className="grid grid-cols-12 w-full ">
              <div className="border border-black col-span-1 text-center"></div>
              <div className="border border-black col-span-6 pl-2 ">Total</div>
              <div className="border border-black col-span-1 text-center"></div>
              <div className="border border-black col-span-2 text-center">
                {debitBalance}
              </div>
              <div className="border border-black col-span-2 text-center">
                {creditBalance}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default page;
