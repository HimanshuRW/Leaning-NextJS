"use client";
import Link from "next/link";

export default function MyLink({to,children}) {
  return (
    <Link
      href={to}
      className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      {children}
      <svg
        className="w-4 h-4 ms-2 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </Link>
  );
}
