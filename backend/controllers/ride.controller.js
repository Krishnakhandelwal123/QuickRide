const rideService = require('../services/ride.service');
const mapService = require('../services/maps.service');
const {validationResult} = require('express-validator');
const {sendMessageToSocketId} = require('../socket');
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }   
   const {pickup, destination, vehicleType} = req.body;
   try {
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        res.status(201).json(ride);
        const pickupCoords = await mapService.getAddressCoordinate(pickup);
        const captainsInRadius = await mapService.getCaptainsInRadius(pickupCoords.lat, pickupCoords.lng, 5000);
        await ride.populate('user');
        const rideForCaptain = ride.toObject ? ride.toObject() : { ...ride };
        rideForCaptain.otp = null;
        captainsInRadius.forEach((captain) => {
            if (!captain.socketId) return;
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideForCaptain 
            });
        });
   } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Server error', error: error.message });
   }
}  

module.exports.getFare= async (req, res) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    const {pickup, destination} = req.query;
     try {
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json(fare);
     } catch (error) {   
            console.error(error);
               res.status(500).json({ message: 'Server error', error: error.message });
     }
} 