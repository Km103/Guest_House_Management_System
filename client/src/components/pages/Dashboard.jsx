import { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import RoomSelectionBox from "../UI/RoomSelectionBox";
import BookingsTable from "../BookingsTable";

import { normalRooms, suiteRooms, DummyBookings } from "../../lib/data";
import BookingsServicePanel from "../BookingsHelpers/BookingsServicePanel";

import userContext from "../../context/UserContext";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);

    console.log(user);

    const [selectedOptionNavigation, setselectedOptionNavigation] = useState(1);
    const [selectedRoomsData, setSelectedRoomsData] = useState({
        normalRooms: [],
        suiteRooms: [],
        totalPrice: 0,
        date: "",
        day: 1,
    });

    const [bookings, setBookings] = useState({
        normalRooms: [],
        suiteRooms: [],
        totalPrice: 0,
        date: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log(user);

        if (token) {
            console.log("User is logged in");
        } else {
            navigate("/auth/login");
        }
    }, []);

    const [paid, setPaid] = useState(false);

    const selectionHandler = (room) => {
        setSelectedRoomsData((prevState) => {
            const isNormal = room.roomTitle.length <= 3;
            if (isNormal) {
                return {
                    ...prevState,
                    normalRooms: [...prevState.normalRooms, room],
                    totalPrice: prevState.totalPrice + room.price,
                };
            }
            return {
                ...prevState,
                suiteRooms: [...prevState.suiteRooms, room],
                totalPrice: prevState.totalPrice + room.price,
            };
        });
    };

    const deselectionHandler = (room) => {
        setSelectedRoomsData((prevState) => {
            const isNormal = room.roomTitle.length <= 3;
            if (isNormal) {
                const updatedNormalRooms = prevState.normalRooms.filter(
                    (normalRoom) => normalRoom.roomTitle !== room.roomTitle
                );
                return {
                    ...prevState,
                    normalRooms: updatedNormalRooms,
                    totalPrice: prevState.totalPrice - room.price,
                };
            }
            const updatedSuiteRooms = prevState.suiteRooms.filter(
                (suiteRoom) => suiteRoom.roomTitle !== room.roomTitle
            );
            return {
                ...prevState,
                suiteRooms: updatedSuiteRooms,
                totalPrice: prevState.totalPrice - room.price,
            };
        });
    };

    const paidHandler = async (event) => {
        event.preventDefault();
        setPaid(true);
        // setBookings((prevState) => {
        //     const updatedBookings = {
        //         normalRooms: selectedRoomsData.normalRooms,
        //         suiteRooms: selectedRoomsData.suiteRooms,
        //         totalPrice: selectedRoomsData.totalPrice,
        //         date: selectedRoomsData.date,
        //     };

        //     return updatedBookings;
        // });

        const dataToBeSent = {
            customer_id: user._id,
            amount: selectedRoomsData.totalPrice,
            Rooms: selectedRoomsData.normalRooms.concat(bookings.suiteRooms),
            checkin: selectedRoomsData.date,
            days: selectedRoomsData.day,
            token: localStorage.getItem("token"),
        };

        console.log(dataToBeSent);

        const res = await fetch("http://localhost:8000/api/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToBeSent),
        });
        const data = await res.json();
        console.log(data);
    };

    let selectedRoomComponent = (
        <p
            className={`text-center text-2xl font-bold text-gray-200 select-none`}
        >
            Select a room to see total cost.
        </p>
    );

    const payButtonEnable =
        selectedRoomsData.date.length > 0 && selectedRoomsData.day;

    if (
        selectedRoomsData.normalRooms.length +
            selectedRoomsData.suiteRooms.length >
        0
    ) {
        selectedRoomComponent = (
            <form
                onSubmit={paidHandler}
                className={`flex flex-col justify-between w-full h-full`}
            >
                <div
                    className={`flex flex-col justify-start gap-4 h-full items-center w-full select-none`}
                >
                    <p className={`text-gray-200 text-4xl font-bold`}>
                        Payment
                    </p>
                    <section
                        className={`border-b-2 pb-10 border-slate-300 w-full`}
                    >
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
                <button
                    className={`text-xl text-white font-semibold text-center h-12 bg-green-600 flex items-center w-full rounded-lg justify-center   hover:cursor-pointer ${
                        payButtonEnable
                            ? "hover:bg-green-500"
                            : "opacity-50 cursor-not-allowed"
                    }`}
                    type='submit'
                    disabled={!payButtonEnable}
                >
                    Proceed To Pay
                </button>
            </form>
        );
    }

    return (
        <div
            className={`w-4/5 h-max bg-slate-800 rounded-lg shadow-lg flex flex-col `}
        >
            <nav
                className={`border-b-2 border-slate-500 shadow-lg py-6 px-8 text-lg`}
            >
                <ul className={`flex gap-14`}>
                    <li
                        className={`cursor-pointer transition-colors delay-50 font-bold ${
                            selectedOptionNavigation === 1
                                ? "text-gray-200"
                                : "text-gray-600"
                        }`}
                        onClick={() => setselectedOptionNavigation(1)}
                    >
                        Book a Room
                    </li>
                    <li
                        className={`cursor-pointer transition-colors delay-50 font-bold ${
                            selectedOptionNavigation === 2
                                ? "text-gray-200"
                                : "text-gray-600"
                        }
                        }`}
                        onClick={() => setselectedOptionNavigation(2)}
                    >
                        Bookings
                    </li>
                </ul>
            </nav>
            {/* Book a room  */}
            {selectedOptionNavigation === 1 && (
                <main className={`flex h-full`}>
                    <section
                        className={`w-4/5 h-full py-6 px-8 border-r-2 border-slate-500`}
                    >
                        <div className={`flex flex-col gap-8`}>
                            <div className={`flex flex-col gap-4`}>
                                <p
                                    className={`text-gray-200 text-xl font-semibold`}
                                >
                                    Rooms
                                </p>
                                <div className={`flex flex-wrap gap-9`}>
                                    {normalRooms.map((room, ind) => {
                                        return (
                                            <RoomSelectionBox
                                                selectRoomHandler={
                                                    selectionHandler
                                                }
                                                deselectRoomHandler={
                                                    deselectionHandler
                                                }
                                                key={ind + 1}
                                                roomTitle={room.title}
                                                price={room.price}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={`flex flex-col gap-4`}>
                                <p
                                    className={`text-gray-200 text-xl font-semibold`}
                                >
                                    Suites
                                </p>
                                <div className={`flex flex-wrap gap-9`}>
                                    {suiteRooms.map((room, ind) => (
                                        <RoomSelectionBox
                                            selectRoomHandler={selectionHandler}
                                            deselectRoomHandler={
                                                deselectionHandler
                                            }
                                            key={ind + 1}
                                            roomTitle={room.title}
                                            price={room.price}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`w-full flex gap-5`}>
                            <div
                                className={`flex items-center mt-8 gap-5 w-max  `}
                            >
                                <p
                                    className={`text-xl font-semibold text-gray-200`}
                                >
                                    Select Check In Date :
                                </p>
                                <input
                                    className={`text-lg rounded-lg px-4 py-1 bg-slate-700 text-gray-200 select-none`}
                                    type='date'
                                    onChange={(event) => {
                                        setSelectedRoomsData((prevState) => {
                                            return {
                                                ...prevState,
                                                date: event.target.value,
                                            };
                                        });
                                    }}
                                />
                                {/* {enteredDate < today && (
                                    <p className={`text-red-400 font-semibold`}>
                                        Booking Date should be atleast after one
                                        day of booking
                                    </p>
                                )} */}
                            </div>
                            <div
                                className={`flex items-center mt-8 gap-5 w-max`}
                            >
                                <p
                                    className={`text-xl font-semibold text-gray-200`}
                                >
                                    No. of days :
                                </p>
                                <input
                                    className={`text-lg rounded-lg px-4 py-1 w-20 bg-slate-700 text-gray-200 select-none`}
                                    type='number'
                                    min={1}
                                    placeholder='1'
                                    onChange={(event) => {
                                        setSelectedRoomsData((prevState) => {
                                            return {
                                                ...prevState,
                                                day: event.target.value,
                                            };
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                    <section
                        className={`w-1/5 px-8 py-6 flex flex-col items-center justify-center`}
                    >
                        {selectedRoomComponent}
                    </section>
                </main>
            )}
            {/* Bookings  */}
            {selectedOptionNavigation === 2 && (
                <main
                    className={`flex h-full items-center w-full justify-center`}
                >
                    <BookingsTable bookings={DummyBookings} />
                    <BookingsServicePanel />
                    {/* {bookings.normalRooms.length + bookings.suiteRooms.length >
                    0 ? (
                        <BookingsTable bookings={DummyBookings} />
                    ) : (
                        <p className={`text-bold text-gray-200 text-4xl`}>
                            Your bookings will be displayed here
                        </p>
                    )} */}
                </main>
            )}
        </div>
    );
}
