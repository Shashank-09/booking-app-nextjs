const express = require('express')
const { getAvailableSlots , createBooking , getAllBookings , deleteBooking} = require('../controllers/bookingControllers') 

const router = express.Router();

router.get('/available-slots', getAvailableSlots);
router.post('/bookings', createBooking);
router.get('/all-bookings', getAllBookings);
router.delete('/delete-booking/:id' , deleteBooking)

module.exports = router;
