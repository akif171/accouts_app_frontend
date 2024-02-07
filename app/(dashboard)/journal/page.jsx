"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { dummyData } from "@/data/journalEntry";

const accountTypes = [
  "select",
  "Asset",
  "Expense",
  "Revenue",
  "Liability",
  "Capital",
];

const Page = () => {
  const initialDebit = {
    account_name: "",
    account_type: "",
    amount: "",
  };

  const initialCredit = {
    account_name: "",
    account_type: "",
    amount: "",
  };

  const initialEntry = {
    debit: initialDebit,
    credit: initialCredit,
    description: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allEntries, setAllEntries] = useState([]);
  const [entry, setEntry] = useState(initialEntry);
  const [debit, setDebit] = useState(initialDebit);
  const [credit, setCredit] = useState(initialCredit);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleDebit = (e) => {
    const { name, value } = e.target;

    setDebit((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleCredit = (e) => {
    const { name, value } = e.target;

    setCredit((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleEntry = (e) => {
    const { name, value } = e.target;

    setEntry((prevValue) => ({
      ...prevValue,
      debit,
      credit,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch(`https://accounts-api-plum.vercel.app/api/journal`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    })
      .then((res) => res.json())
      .then((data) => setEntry(data));
    // console.log(data);

    closeModal();
    setAllEntries([
      ...allEntries,
      { entry, createdAt: Date.now().toLocaleDateString() },
    ]);
    setDebit(initialDebit);
    setCredit(initialCredit);
    setEntry(initialEntry);
  };

  useEffect(() => {
    function fetchTransactions() {
      fetch(`https://accounts-api-plum.vercel.app/api/journal`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setAllEntries(data);
        });
    }

    fetchTransactions();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl mt-5 font-bold">General Journal</h1>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
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
                    {accountTypes.map((acc, index) => (
                      <option key={index} value={acc}>
                        {acc}
                      </option>
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
                    {accountTypes.map((acc, index) => (
                      <option key={index} value={acc}>
                        {acc}
                      </option>
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
      </Modal>
      <div className="flex justify-end mr-10 mt-10">
        <button
          onClick={openModal}
          className="py-3 px-5 rounded-lg bg-amber-300"
        >
          Create Entry
        </button>
      </div>

      <table className="flex flex-col justify-center mt-5 text-black">
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
        <tbody className=" overflow-y-auto h-screen mb-10  mx-8 ">
          {allEntries.map((entry, index) => (
            <div key={index}>
              <tr className="grid grid-cols-12 ">
                <td className="border border-black col-span-1 text-center">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-black col-span-6 ">
                  {entry.debit.account_name}
                </td>
                <td className="border border-black col-span-1 text-center"></td>
                <td className="border border-black col-span-2 text-center">
                  {entry.debit.amount}
                </td>
                <td className="border border-black col-span-2 text-center"></td>
              </tr>

              <tr className="grid grid-cols-12 ">
                <td className="border border-black col-span-1 text-center">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-black col-span-6 ">
                  &emsp; &emsp; &emsp; {entry.credit.account_name}
                </td>
                <td className="border border-black col-span-1 text-center"></td>
                <td className="border border-black col-span-2 text-center"></td>
                <td className="border border-black col-span-2 text-center">
                  {entry.credit.amount}
                </td>
              </tr>

              <tr className="grid grid-cols-12 ">
                <td className="border border-black col-span-1 text-center"></td>
                <td className="border border-black col-span-6 ">
                  ({entry.description})
                </td>
                <td className="border border-black col-span-1 text-center"></td>
                <td className="border border-black col-span-2 text-center"></td>
                <td className="border border-black col-span-2 text-center"></td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
