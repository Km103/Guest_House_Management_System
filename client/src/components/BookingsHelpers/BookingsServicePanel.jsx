export default function BookingsServicePanel() {
    return (
        <div className={`flex flex-col justify-between w-1/5 h-full`}>
            <div
                className={`flex flex-col justify-start gap-4 h-full items-center w-full select-none`}
            >
                {/*<p className={`text-gray-200 text-4xl font-bold`}>Payment</p>
                <section className={`border-b-2 pb-10 border-slate-300 w-full`}>
                    <div className={`flex justify-between w-full text-xl`}>
                        <span className={`text-gray-300`}>Rooms</span>
                        <span className={`text-gray-200 font-bold`}>
                            {selectedRoomsData.normalRooms.length}
                        </span>
                    </div>
                    <span></span>
                    <div className={`flex justify-between w-full text-xl`}>
                        <span className={`text-gray-300`}>Suites</span>
                        <span className={`text-gray-200 font-bold`}>
                            {selectedRoomsData.suiteRooms.length}
                        </span>
                    </div>
                </section>
                <div
                    className={`flex justify-between text-2xl w-full font-bold`}
                >
                    <span className={`text-gray-300`}>&#8377;</span>
                    <span className={`text-gray-200`}>
                        {selectedRoomsData.totalPrice}
                    </span>
                </div>
            </div>
            <div className=''>
                <Link
                    to='/paymentack'
                    className={`text-xl text-white font-semibold text-center h-12 bg-green-600 flex items-center w-full rounded-lg justify-center   hover:cursor-pointer ${
                        payButtonEnable
                            ? "hover:bg-green-500"
                            : "opacity-50 cursor-not-allowed"
                    }`}
                >
                    <button disabled={!payButtonEnable} onClick={paidHandler}>
                        Proceed To Pay
                    </button>
                </Link> */}
            </div>
        </div>
    );
}
