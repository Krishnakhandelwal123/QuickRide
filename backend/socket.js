const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data || {};
            if (!userId || !userType) return;

            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (err) {
                console.error('Socket join update failed:', err.message);
            }
        });


        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [location.lng, location.lat]
                    }
                });
                console.log(`Captain ${userId} location updated: [${location.lng}, ${location.lat}]`);

                // Notify any user who has an active ride with this captain
                const activeRides = await rideModel
                    .find({
                        captain: userId,
                        status: { $in: ['accepted', 'ongoing'] }
                    })
                    .populate('user');

                if (io && activeRides?.length) {
                    activeRides.forEach((ride) => {
                        const user = ride.user;
                        if (!user?.socketId) return;
                        io.to(user.socketId).emit('captain-location-update', {
                            rideId: ride._id,
                            location
                        });
                    });
                }

                socket.emit('location-updated', { message: 'Location updated successfully' });
            } catch (err) {
                console.error('Location update failed:', err.message);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });

        socket.on('accept-ride', async (data) => {
            const { rideId, captainId } = data || {};
            if (!rideId || !captainId) return;

            try {
                const ride = await rideModel.findByIdAndUpdate(
                    rideId,
                    { captain: captainId, status: 'accepted' },
                    { new: true }
                )
                    .populate('user')
                    .populate('captain')
                    .select('+otp')
                    .lean();

                if (!ride) return;

                const userId = ride.user?._id || ride.user;
                if (!userId) return;
                const user = await userModel.findById(userId);
                if (!user?.socketId) return;

                if (io) {
                    io.to(user.socketId).emit('ride-accepted', ride);
                }
            } catch (err) {
                console.error('accept-ride error:', err.message);
            }
        });

        socket.on('start-ride', async (data, callback) => {
            const { rideId, captainId, otp } = data || {};

            const safeCallback =
                typeof callback === 'function' ? callback : () => {};

            if (!rideId || !captainId || !otp) {
                safeCallback({ ok: false, message: 'Missing required data.' });
                return;
            }

            try {
                const ride = await rideModel
                    .findById(rideId)
                    .select('+otp')
                    .populate('user')
                    .populate('captain');

                if (!ride) {
                    safeCallback({ ok: false, message: 'Ride not found.' });
                    return;
                }

                if (ride.status !== 'accepted') {
                    safeCallback({ ok: false, message: 'Ride is not in accepted state.' });
                    return;
                }

                if (!ride.captain || String(ride.captain._id || ride.captain) !== String(captainId)) {
                    safeCallback({ ok: false, message: 'This ride is not assigned to you.' });
                    return;
                }

                if (String(ride.otp) !== String(otp)) {
                    safeCallback({ ok: false, message: 'Invalid OTP.' });
                    return;
                }

                ride.status = 'ongoing';
                await ride.save();

                const rideObj = ride.toObject ? ride.toObject() : { ...ride };
                delete rideObj.otp;

                const userId = rideObj.user?._id || rideObj.user;
                if (io && userId) {
                    const user = await userModel.findById(userId);
                    if (user?.socketId) {
                        io.to(user.socketId).emit('ride-started', rideObj);
                    }
                }

                safeCallback({ ok: true, ride: rideObj });
            } catch (err) {
                console.error('start-ride error:', err.message);
                safeCallback({ ok: false, message: 'Server error.' });
            }
        });

        socket.on('finish-ride', async (data, callback) => {
            const { rideId, captainId } = data || {};

            const safeCallback =
                typeof callback === 'function' ? callback : () => {};

            if (!rideId || !captainId) {
                safeCallback({ ok: false, message: 'Missing required data.' });
                return;
            }

            try {
                const ride = await rideModel
                    .findById(rideId)
                    .populate('user')
                    .populate('captain');

                if (!ride) {
                    safeCallback({ ok: false, message: 'Ride not found.' });
                    return;
                }

                if (!ride.captain || String(ride.captain._id || ride.captain) !== String(captainId)) {
                    safeCallback({ ok: false, message: 'This ride is not assigned to you.' });
                    return;
                }

                ride.status = 'completed';
                await ride.save();

                const rideObj = ride.toObject ? ride.toObject() : { ...ride };

                const userId = rideObj.user?._id || rideObj.user;
                if (io && userId) {
                    const user = await userModel.findById(userId);
                    if (user?.socketId) {
                        io.to(user.socketId).emit('ride-completed', rideObj);
                    }
                }

                safeCallback({ ok: true, ride: rideObj });
            } catch (err) {
                console.error('finish-ride error:', err.message);
                safeCallback({ ok: false, message: 'Server error.' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };