"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { dummyData } from "@/data/journalEntry";

const page = () => {
  const [ledgers, setLedgers] = useState([]);

  const allDebits = [];
  const allCredits = [];

  let debitBalance;
  let creditBalance;

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
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-center font-bold text-xl">General Journal</h1>
        <div>
          <form>
            <div className="w-full mt-5 border border-gray-500 p-3 rounded-lg">
              <h2 className="text-center font-bold">Debit</h2>

              <div className="flex my-5">
                <div className="flex flex-col">
                  <label>Account Name</label>
                  <input
                    onChange={handleDebit}
                    className="border p-2 col-span-3"
                    type="text"
                    name="account_name"
                    value={debit.account_name}
                    placeholder="account name"
                  />
                </div>

                <div className="flex flex-col">
                  <label>Type</label>
                  <select
                    className="border p-2"
                    name="account_type"
                    onChange={handleDebit}
                  >
                    {accountTypes.map((acc) => (
                      <option value={acc}>{acc}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label>Amount</label>
                  <input
                    onChange={handleDebit}
                    className="border p-2"
                    type="text"
                    name="amount"
                    value={debit.amount}
                    placeholder="amount"
                  />
                </div>
              </div>
            </div>
            <div className="w-full mt-5 border border-gray-500 p-3 rounded-lg">
              <h2 className="text-center font-bold">Credit</h2>

              <div className="flex my-5">
                <div className="flex flex-col">
                  <label>Account Name</label>
                  <input
                    onChange={handleCredit}
                    className="border p-2 col-span-3"
                    type="text"
                    name="account_name"
                    value={credit.account_name}
                    placeholder="account name"
                  />
                </div>

                <div className="flex flex-col">
                  <label>Type</label>
                  <select
                    className="border p-2"
                    name="account_type"
                    onChange={handleCredit}
                  >
                    {accountTypes.map((acc) => (
                      <option value={acc}>{acc}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label>Amount</label>
                  <input
                    onChange={handleCredit}
                    className="border p-2"
                    type="text"
                    name="amount"
                    value={credit.amount}
                    placeholder="amount"
                  />
                </div>
              </div>
            </div>

            <div>
              <input
                required
                onChange={handleEntry}
                type="text"
                name="description"
                value={entry.description}
                placeholder="description"
                className="w-full p-3 border border-gray-500 rounded-lg mt-5"
              />
            </div>
          </form>
          <div className="flex justify-between mt-5">
            <button
              onClick={closeModal}
              className="py-2 px-5 bg-red-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="py-2 px-5 bg-green-300 rounded-lg"
            >
              Save Entry
            </button>
          </div>
        </div>
      </Modal> */}
      {/* <div className="flex justify-end mr-10 mt-10">
        <button
          // onClick={openModal}
          className="py-3 px-5 rounded-lg bg-amber-300"
        >
          Create Entry
        </button>
      </div> */}

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

            console.log(debitBalance);
            console.log(creditBalance);

            console.log(allDebits);
            console.log(allCredits);

            // console.log(total);
            // console.log(balance);
            return (
              <tr className="grid grid-cols-1">
                <td className="grid grid-cols-12 w-full ">
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
