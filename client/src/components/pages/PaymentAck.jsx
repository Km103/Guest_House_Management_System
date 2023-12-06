import { Link } from "react-router-dom";

export default function PaymentAck() {
    return (
        <div className={`flex flex-col items-center gap-10`}>
            <p className={`text-4xl font-bold text-gray-200`}>Payment Done</p>
            <p className={`text-3xl font-semibold text-gray-400`}>
                You may see your bookings in the Bookings section
            </p>
            <div className='text-white text-center h-12 bg-blue-600 flex items-center w-full rounded-lg justify-center hover:cursor-pointer hover:bg-blue-500'>
                <Link to='/dashboard' className={`text-xl`}>
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
