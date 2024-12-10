"use client";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";

export default function Home() {
  const { user } = useUserContext();

  console.log(user, "userdata")

  return (
    <div>
      <Navbar />
      <div className="text-black flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">Welcome to htstechSolution</h1>
          {user ? (
            <div className="mt-4 text-center">
              <p className="text-gray-700">Login Successful!</p>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
            </div>
          ) : (
            <div className="mt-4 text-center text-red-500">
              <p>Please login to get your email and password.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-blue-500 text-white">
      <h1 className="text-lg font-bold">HTS<span className="text-gray-300">&quot;TECH&quot;</span>SOLUTION</h1>
      <ul className="flex gap-4">
        <li>
          <Link href="/loginpage">
            <button className="px-4 py-2 bg-white text-blue-500 rounded-md hover:bg-gray-200">
              Login
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
