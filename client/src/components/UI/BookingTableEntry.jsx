export default function BookingsTableEntry({ booking }) {
    return (
        <div className={`flex justify-between w-full h-1/10`}>
            {/* Room / Suite  */}
            <span>{booking.title}</span>

            {/* Check In Date */}
            <span>{booking.date}</span>

            {/* Payment Paid  */}
            <span>{booking.totalPrice}</span>
        </div>
    );
}
