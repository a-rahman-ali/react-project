import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import BookingModal from './BookingModal';

function Home() {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [pendingBookings, setPendingBookings] = useState([]);

    // Fetch meeting rooms from json-server
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:3000/meetingRooms');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleBookRoom = (roomId) => {
        setSelectedRoomId(roomId);
        setIsModalOpen(true);
    };

    const handleSaveBooking = async (bookingData) => {
        const userRole = localStorage.getItem('role');
        const endpoint = userRole === 'manager' ? 'bookings' : 'pendingBookings';

        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                if (userRole === 'manager') {
                    console.log('Booking saved directly');
                } else {
                    setPendingBookings([...pendingBookings, { roomId: bookingData.roomId }]);
                }
                setIsModalOpen(false);
            } else {
                console.error('Failed to save booking');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col mx-3 my-3">
            {rooms.map(room => (
                <RoomCard
                    key={room.id}
                    roomName={room.name}
                    url={room.url}
                    capacity={room.capacity}
                    availability={room.availability}
                    roomId={room.id}
                    isPending={pendingBookings.some(booking => booking.roomId === room.id)}
                    bookRoom={() => handleBookRoom(room.id)}
                />
            ))}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveBooking}
                roomId={selectedRoomId}
                roomCapacity={rooms.find(room => room.id === selectedRoomId)?.capacity}
            />
        </div>
    );
}

export default Home;
