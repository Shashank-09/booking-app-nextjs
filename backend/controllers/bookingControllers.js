const Booking = require('../models/booking')

const availableSlots = [
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
  ];

 async function getAvailableSlots(req, res) {
    const { date } = req.query;
    try {
      const bookedSlots = await Booking.find({ date }).select('time -_id');
      const bookedTimes = bookedSlots.map((b) => b.time);
      const remainingSlots = availableSlots.filter((slot) => !bookedTimes.includes(slot));
      res.json({ slots: remainingSlots });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching available slots', error });
    }
  };

  async function createBooking(req, res) {
    const { date, time, guests, name, contact } = req.body;
  
    try {
      const slotOccupied = await Booking.findOne({ date, time });
      if (slotOccupied) {
        return res.status(400).json({ message: 'Slot already booked by another person' });
      }
      
      const existing = await Booking.findOne({
        name ,
        contact
      });
      
      console.log("Existing Booking:", existing);
      if (existing) {
        return res.status(400).json({ message: 'A booking with this name already exists for this slot' });
      }

      const booking = new Booking({ date, time, guests, name, contact });
      await booking.save();
  
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking', error });
    }
  }
  

  const getAllBookings = async (req, res) => {
    const { date } = req.query;
    try {
      const selectedDate = new Date(date); 
      const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0)); 
      const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999)); 
      const bookings = await Booking.find({
        date: {
          $gte: startOfDay,  
          $lt: endOfDay,     
        },
      });
      res.status(200).json(bookings); 
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
  };

  const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting booking" });
    }
  }

  
  
  
  
  
  

module.exports = {
    getAvailableSlots,
    createBooking,
    getAllBookings,
    deleteBooking
}