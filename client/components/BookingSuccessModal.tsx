import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface BookingSuccessProps {
  name: string;
  date: string;
  time: string;
  show: boolean; 
}

const BookingSuccessModal: React.FC<BookingSuccessProps> = ({
  name,
  date,
  time,
  show,
}) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-gray-800 transform transition-all duration-300 ${
              show ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
              <div className="flex flex-col items-center">
              <AiOutlineCheckCircle className="text-green-500 text-5xl mb-4" />
              <h2 className="text-xl font-bold text-center text-gray-900">
                Booking Confirmed!
              </h2>
              <p className="text-center mt-2 text-gray-600">
                Thank you, <span className="font-semibold">{name}</span>, for
                booking with us!
              </p>
              <p className="text-center text-gray-600">
                Your table is reserved on <span className="font-semibold">{date}</span> at{" "}
                <span className="font-semibold">{time}</span>.
              </p>
              <p className="text-center mt-4 text-gray-600">
                We look forward to serving you!
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <Link
               href="/bookings"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                View Bookings
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingSuccessModal;
