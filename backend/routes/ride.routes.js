const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/create',
    authMiddleware.authUser,
    body('pickup').trim().notEmpty().withMessage('Pickup is required').isLength({ min: 3 }).withMessage('Pickup must be at least 3 characters'),
    body('destination').trim().notEmpty().withMessage('Destination is required').isLength({ min: 3 }).withMessage('Destination must be at least 3 characters'),
    body('vehicleType').trim().notEmpty().withMessage('Vehicle type is required').isIn(['auto', 'car', 'moto']).withMessage('Vehicle type must be auto, car, or motorcycle'),
    rideController.createRide
)
 


module.exports = router;