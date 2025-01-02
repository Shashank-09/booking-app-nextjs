"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingSuccessModal from './BookingSuccessModal';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    guests: 1,
    name: '',
    contact: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleBookingSuccess = () => {
    setShowModal(true); 
  };

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA")
    setFormData((prev) => ({ ...prev, date: formattedDate }));
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/available-slots', {
        params: { date: formData.date, guests: formData.guests },
      });
      setAvailableSlots(response.data.slots);
      setStep(2);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/bookings', { ...formData, time: selectedSlot });
      setSuccess(true);
    } catch (error) {
      alert("A booking with this name already exists for this slot")
      console.error('Error creating booking:', error);
    }
  };

  if (success) {
    return <BookingSuccessModal 
    name={formData.name} 
    date={formData.date} 
    time={selectedSlot} 
    show={showModal}
  />;
  }


  return (
    <>
    <h1 className='text-4xl text-center mt-2 font-bold'>Restaurant Table Booking System
    </h1>
    <form onSubmit={step === 1 ? fetchAvailableSlots : handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white mt-6">
      {step === 1 && (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Guests:</label>
              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <button
              type="button"
              onClick={fetchAvailableSlots}
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
            >
              Check Availability
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium">Available Slots:</label>
              <select
                name="time"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="mt-2 p-2 w-full rounded-md bg-gray-700 text-white"
                required
              >
                <option value="" disabled>Select a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Contact:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-2 p-2 w-full rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleBookingSuccess}
              className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold"
            >
              Book Table
            </button>
          </div>
        </>
      )}
    </form>
    </>
  );
};

export default BookingForm;
