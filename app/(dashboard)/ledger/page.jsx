"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { dummyData } from "@/data/journalEntry";
// console.log(dummyData);

const Page = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [account, setAccount] = useState("");

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const debit = [];
  const credit = [];

  console.log(ledgers);

  async function createLedger() {
    const transactionIds = [];

    transactions.map((tran) => {
      transactionIds.push(tran._id);
    });

    const ledgerObj = {
      account_name: account,
      transactionIds,
    };

    const data = await fetch(`${process.env.BACKEND_URL}/api/ledger`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ledgerObj),
    });

    setAccount("");
    // router.refresh()
    // router.refresh();
    // console.log(ledgerObj);
  }

  async function updateLedger(id) {
    const transactionIds = [];

    transactions.map((tran) => {
      transactionIds.push(tran._id);
    });

    const ledgerObj = {
      account_name: account,
      transactionIds,
    };

    console.log(id);
    // console.log(ledgerObj);

    const data = await fetch(`${process.env.BACKEND_URL}/api/ledger/${id}`, {
      method: "PUT",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ledgerObj),
    });
    console.log(data);

    // console.log(transactions);
    // setAccount("");
    // console.log(ledgerObj);
  }

  async function deleteLedger(id) {
    const filteredLedgers = ledgers.filter((led) => led._id !== id);

    setLedgers(filteredLedgers);

    const data = await fetch(`http://localhost:5000/api/ledger/${id}`, {
      method: "DELETE",
    });
  }

  useEffect(() => {
    if (account) {
      fetch(`http://localhost:5000/api/journal?account=${account}`)
        .then((res) => res.json())
        .then((data) => setTransactions(data));
    }
  }, [account]);

  useEffect(() => {
    async function fetchLedgers() {
      const res = await fetch("http://localhost:5000/api/ledger");
      const data = await res.json();
      setLedgers(data);
    }
    fetchLedgers();
  }, []);

  // console.log(ledgers);
  // console.log(transactions.map((entry) => entry._id));

  return (
    <div className="w-full p-5">
      <h1 className="text-center my-5 font-bold text-2xl">General Ledger</h1>

      <div className=" mx-10">
        <div className="flex ">
          <div className="flex flex-col">
            <label>Account Name</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="account name"
                className="border p-2"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
              <button
                onClick={createLedger}
                className="py-2 px-4 bg-green-300 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        {transactions.length < 1 && (
          <p className="my-2 text-red-500">Account doen not found.</p>
        )}
      </div>
      {ledgers.map((trans, index) => {
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
        } else {
          total = creditTotal;
          balance = total - debitTotal;
        }
        return (
          <div key={index}>
            <h1 className="text-center my-3 text-xl font-bold capitalize">
              {trans.account_name} Ledger
            </h1>
            <div className="flex gap-3">
              <button
                className="py-2 px-4 bg-teal-500 rounded-lg"
                onClick={() => updateLedger(trans._id)}
              >
                Update Ledger
              </button>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-lg"
                onClick={() => deleteLedger(trans._id)}
              >
                Delete Ledger
              </button>
            </div>
            <table className="w-full  mt-5">
              <thead className="grid grid-cols-2 w-full text-center bg-blue-300">
                <tr className="grid grid-cols-6">
                  <td className="border border-gray-500">Date</td>
                  <td className="border border-gray-500 col-span-3">
                    Particular
                  </td>
                  <td className="border border-gray-500">J/F</td>
                  <td className="border border-gray-500">Amount</td>
                </tr>
                <tr className=" grid grid-cols-6">
                  <td className="border border-gray-500">Date</td>
                  <td className="border border-gray-500 col-span-3">
                    Particular
                  </td>
                  <td className="border border-gray-500">J/F</td>
                  <td className="border border-gray-500">Amount</td>
                </tr>
              </thead>
              <tbody className="grid grid-cols-2 gap-0 text-center">
                <tr>
                  {debit.map((entry, index) => {
                    // console.log(entry);
                    return (
                      <td key={index} className="grid grid-cols-6 m">
                        <div className="border border-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </div>
                        <div className="border border-gray-500 col-span-3 text-start pl-2">
                          To {entry.credit.account_name}
                        </div>
                        <div className="border border-gray-500"></div>
                        <div className="border border-gray-500">
                          {entry.debit.amount}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  {credit.map((entry, index) => (
                    <td key={index} className="grid grid-cols-6 ">
                      <div className="border border-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </div>
                      <div className="border border-gray-500 col-span-3 text-start pl-2">
                        By {entry.debit.account_name}
                      </div>
                      <div className="border border-gray-500"></div>
                      <div className="border border-gray-500">
                        {entry.credit.amount}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
              <tfoot className="w-full text-center bg-yellow-300">
                <tr className="grid grid-cols-2">
                  <td className="grid grid-cols-6">
                    <div className="border border-gray-500 text-sm"></div>
                    <div className="border border-gray-500 col-span-3 text-start pl-2">
                      {" "}
                      {debitTotal < creditTotal && `To Balance C/D`}
                    </div>
                    <div className="border border-gray-500"></div>
                    <div className="border border-gray-500">
                      {debitTotal < creditTotal && balance}
                    </div>
                  </td>
                  <td className=" grid grid-cols-6">
                    <div className="border border-gray-500 text-sm"></div>
                    <div className="border border-gray-500 col-span-3 text-start pl-2">
                      {" "}
                      {debitTotal > creditTotal && `By Balance C/D`}
                    </div>
                    <div className="border border-gray-500"></div>
                    <div className="border border-gray-500">
                      {debitTotal > creditTotal && balance}
                    </div>
                  </td>
                </tr>
                <tr className="grid grid-cols-2">
                  <td className="grid grid-cols-6">
                    <div className="border border-gray-500 text-sm"></div>
                    <div className="border border-gray-500 col-span-3 text-left pl-2">
                      Total
                    </div>
                    <div className="border border-gray-500"></div>
                    <div className="border border-gray-500">{total}</div>
                  </td>
                  <td className=" grid grid-cols-6">
                    <div className="border border-gray-500 text-sm"></div>
                    <div className="border border-gray-500 col-span-3 text-left pl-2">
                      Total
                    </div>
                    <div className="border border-gray-500"></div>
                    <div className="border border-gray-500">{total}</div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
