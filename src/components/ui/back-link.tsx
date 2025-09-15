"use client";
import React from "react";
import { useRouter } from "next/navigation";

type BackLinkProps = {
  className?: string;
  label?: string;
};

export default function BackLink({
  className = "",
  label = "Back",
}: BackLinkProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      aria-label={label}
      className={
        "cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-full  text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition " +
        className
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9.53 4.47a.75.75 0 010 1.06L4.81 10.25H20a.75.75 0 010 1.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
