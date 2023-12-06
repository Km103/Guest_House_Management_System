export default function AdminServicePanel() {
    const cancelBookingHandler = () => {};

    return (
        <div
            className={`flex items-center gap-5 flex-col p-4 justify-between w-1/5 h-full`}
        >
            <div
                className={`flex flex-col justify-start gap-4 items-center w-full select-none`}
            >
                <p className={`text-gray-200 text-4xl font-bold`}>Booking</p>
                <p className={`text-gray-200 text-2xl font-semibold`}>201</p>
                <p className={`text-yellow-200 text-2xl font-semibold`}>
                    Pawan Kumar
                </p>
            </div>
            <div
                className={`w-4/5 py-4 border-4   border-slate-600 text-center text-gray-200 rounded-lg hover:border-green-400 cursor-pointer`}
            >
                {" "}
                Send Complementary Food
            </div>
            <div
                className={`flex flex-col items-center gap-3 w-4/5 text-gray-200 `}
            >
                <p className={`font-semibold select-none`}>Feedback:</p>
                <p
                    className={` w-full  border-slate-500 text-center text-gray-200 rounded-lg hover:border-gray-400 font-normal resize-none`}
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nam, quos!.
                </p>
            </div>
            <button
                className={`text-sm text-white font-semibold text-center h-12 bg-red-600 w-full rounded-lg hover:bg-red-500  hover:cursor-pointer `}
                onClick={cancelBookingHandler}
            >
                Cancel booking
            </button>
        </div>
    );
}
