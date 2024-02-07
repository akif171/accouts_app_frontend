"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Login = () => {
  const router = useRouter();
  const initialUser = {
    email: "",
    password: "",
  };
  console.log(process.env.BACKEND_URL);

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
    const res = await fetch(`https://accounts-api-plum.vercel.app/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      localStorage.setItem("token", data.token);
      setUser(initialUser);
      router.push("/journal");
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5 items-center mt-20 w-full">
      <h1 className="text-3xl">Login</h1>
      <form>
        <div className="flex flex-col">
          <label className="mb-2">Email</label>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="text"
            placeholder="email"
            className="outline-none border border-gray-300 p-2 bg-gray-100 rounded "
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Password</label>
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="password"
            className="outline-none border border-gray-300 p-2 bg-gray-100 rounded "
          />
        </div>
      </form>
      <p>
        do not have an account?{" "}
        <Link href={"/sign-up"} className="text-blue-500">
          SignUp
        </Link>
      </p>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-3 py-2 text-white w-64 rounded hover:bg-blue-400"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
