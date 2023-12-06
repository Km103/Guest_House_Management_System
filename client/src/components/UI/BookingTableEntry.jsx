export default function BookingsTableEntry({ booking }) {
    return (
        <div
            className={`flex  text-gray-200 justify-evenly w-full h-1/6 items-center hover:bg-slate-700 hover:cursor-pointer rounded-lg`}
        >
            {/* Room / Suite  */}
            <span className={`w-1/5 text-center`}>{booking.name}</span>

            {/* Room Number  */}
            <span className={`w-1/5 text-center`}>{booking.room}</span>

            {/* Check In Date */}
            <span className={`w-1/5 text-center`}>{booking.checkIn}</span>
            {/* Check Out Date */}
            <span className={`w-1/5 text-center`}>{booking.checkOut}</span>

            {/* Payment Paid  */}
            <span className={`w-1/5 text-center`}>{booking.totalPrice}</span>
        </div>
    );
}
