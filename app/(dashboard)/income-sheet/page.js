"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const page = () => {
  const data = useAppSelector((state) => state.incomeSheet);
  console.log(data);

  return <div>page</div>;
};

export default page;
