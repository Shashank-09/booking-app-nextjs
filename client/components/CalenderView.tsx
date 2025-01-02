"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const CalendarView = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (selectedDate && isMounted) {
      const formattedDate = selectedDate.toLocaleDateString("en-CA");
      console.log("Formatted Selected Date:", formattedDate);

      axios
        .get(`http://localhost:4000/api/all-bookings?date=${formattedDate}`)
        .then((response) => setBookings(response.data))
        .catch((err) => console.error(err));
    }
  }, [selectedDate, isMounted]);

  const handleDelete = async (bookingId: string) => {
    console.log(bookingId)
    try {
      await axios.delete(`http://localhost:4000/api/delete-booking/${bookingId}`);
      setBookings((prevBookings) => prevBookings.filter((booking: any) => booking._id !== bookingId));
      console.log("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Restaurant Bookings
        </h2>
        <div className="mb-6 flex justify-center items-center">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-lg bg-gray-800 text-white border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300 ;"
          />
        </div>

        {selectedDate && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">
              Bookings for {selectedDate.toDateString()}
            </h3>
            {bookings.length > 0 ? (
              <ul className="space-y-3">
                {bookings.map((booking: any, ) => (
                  <li
                    key={booking._id}
                    className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg">
                        {booking.time} - {booking.name} ({booking.guests} guests)
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                No bookings available for this day.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
