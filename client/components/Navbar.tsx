import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-lg">
      <div>
        <h1 className="text-xl font-bold">
            <Link href="/">Home</Link>
        </h1>
      </div>
      <div>
        <Link href='/bookings' className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
        View Bookings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
