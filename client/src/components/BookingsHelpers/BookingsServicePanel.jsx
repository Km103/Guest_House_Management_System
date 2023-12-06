import { useState } from "react";

export default function BookingsServicePanel() {
    const [feedback, setFeedback] = useState("");

    const feedbackSubmitHandler = () => {};
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
            </div>
            <div
                className={`w-4/5 py-4 border-4   border-slate-600 text-center text-gray-200 rounded-lg hover:border-gray-400 cursor-pointer`}
            >
                {" "}
                Summon Room Service
            </div>
            <div
                className={`flex flex-col items-center gap-3 w-4/5 text-gray-200 `}
            >
                <div>Feedback: </div>
                <textarea
                    onChange={(event) => {
                        setFeedback(event.target.value);
                    }}
                    className={`border-4 bg-slate-600 w-full  border-slate-500 text-center text-gray-200 rounded-lg hover:border-gray-400 font-normal resize-none`}
                />
                <button
                    className={`text-sm text-white font-semibold text-center h-8 bg-blue-600 w-full rounded-lg   hover:cursor-pointer ${
                        feedback.length
                            ? "hover:bg-blue-500"
                            : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!feedback.length}
                    onClick={feedbackSubmitHandler}
                >
                    Submit Feedback
                </button>
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
