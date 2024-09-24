import React, { useState, useEffect } from 'react';

const BookingModal = ({ isOpen, onClose, onSave, roomId, roomCapacity }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [numPeople, setNumPeople] = useState('');
    const [userId, setUserId] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const now = new Date();
            const defaultStartTime = now.toISOString().slice(0, 16);
            const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
            const defaultEndTime = oneHourLater.toISOString().slice(0, 16);

            setStartTime(defaultStartTime);
            setEndTime(defaultEndTime);
            setNumPeople(roomCapacity);

            const fetchUserData = async () => {
                const username = localStorage.getItem('user');
                const role = localStorage.getItem('role');
                if (username) {
                    setUserRole(role);
                    try {
                        const response = await fetch(`http://localhost:3000/users?username=${username}`);
                        const users = await response.json();
                        if (users.length > 0) {
                            const user = users[0];
                            setUserId(user.id);
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                }
            };

            fetchUserData();
        }
    }, [isOpen, roomCapacity]);

    useEffect(() => {
        setIsFormValid(startTime && endTime && numPeople && userId);
    }, [startTime, endTime, numPeople, userId]);

    const handleSave = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const bookingData = { startTime, endTime, numPeople, userId, roomId };

        try {
            // Check for conflicts before saving
            const existingBookingsResponse = await fetch(`http://localhost:3000/bookings?roomId=${roomId}`);
            const existingBookings = await existingBookingsResponse.json();

            const hasConflict = existingBookings.some(booking => {
                const existingStartTime = new Date(booking.startTime).getTime();
                const existingEndTime = new Date(booking.endTime).getTime();
                const newStartTime = new Date(startTime).getTime();
                const newEndTime = new Date(endTime).getTime();

                return (
                    (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
                    (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
                    (newStartTime <= existingStartTime && newEndTime >= existingEndTime)
                );
            });

            if (hasConflict) {
                alert('Please choose another date/time. This slot is already booked.');
            } else {
                await onSave(bookingData);
                onClose();
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <h2 className="text-xl mb-4">Book Room</h2>
                <div className="mb-2">
                    <label className="block">Start Time</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">End Time</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">Number of People</label>
                    <input
                        type="number"
                        min={1}
                        value={numPeople}
                        onChange={(e) => setNumPeople(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">User ID</label>
                    <input
                        type="text"
                        value={userId}
                        readOnly
                        className="border p-2 w-full bg-gray-100"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className={`mr-2 p-2 rounded bg-red-400 text-white`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className={`ml-2 p-2 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black cursor-not-allowed'}`}
                        disabled={!isFormValid || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
