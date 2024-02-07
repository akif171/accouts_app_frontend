"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const initialUser = {
    business: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(user);

  const handleSubmit = async () => {
    const res = await fetch(`https://accounts-api-plum.vercel.app/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      setUser(initialUser);
      router.push("/login");
    }
    // const data = req.json();
  };

  return (
    <div className="flex flex-col justify-center gap-5 items-center mt-20 w-full">
      <h1 className="text-3xl">SignUp</h1>
      <div className="flex flex-col">
        <label className="mb-2">Business Name</label>
        <input
          type="text"
          placeholder="Business"
          name="business"
          value={user.business}
          className="outline-none border border-gray-300 p-2 bg-gray-100 rounded "
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">Email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="email"
          className="outline-none border border-gray-300 p-2 bg-gray-100 rounded "
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
          className="outline-none border border-gray-300 p-2 bg-gray-100 rounded "
          onChange={handleChange}
        />
      </div>
      <p>
        Already have an account?{" "}
        <Link href={"/login"} className="text-blue-500">
          Login
        </Link>
      </p>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-3 py-2 text-white w-64 rounded hover:bg-blue-400"
      >
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
