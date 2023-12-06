import BookingsTableEntry from "./UI/BookingTableEntry";

export default function BookingsTable({ bookings }) {
    return (
        <div
            className={`flex gap flex-col justify-start w-4/5 h-full border-r-2 border-slate-500`}
        >
            {/* Table Headings  */}
            <section
                className={`flex justify-evenly text-gray-200 border-b-2 w-full self-start py-4 font-semibold`}
            >
                <span className={`w-1/5 text-center`}>Name</span>
                <span className={`w-1/5 text-center`}>Room/Suite</span>
                <span className={`w-1/5 text-center`}>Check In Date</span>
                <span className={`w-1/5 text-center`}>Check Out Date</span>
                <span className={`w-1/5 text-center`}>Price</span>
            </section>
            <div className={`flex flex-col gap-3 h-full justify-evenly`}>
                {bookings.map((ele, ind) => (
                    <BookingsTableEntry booking={ele} key={ind} />
                ))}
            </div>
        </div>
    );
}
