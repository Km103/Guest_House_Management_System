export default function BookingsTable({ bookings }) {
    return (
        <section className={`flex text-white border-b-2 w-full`}>
            <span>Room/Suite</span>
            <span>Check In Date</span>
            <span>Payment Paid</span>
        </section>
    );
}
