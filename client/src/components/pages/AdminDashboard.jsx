import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import RoomSelectionBox from "../UI/RoomSelectionBox";
import BookingsTable from "../BookingsTable";

import { normalRooms, suiteRooms, DummyBookings } from "../../lib/data";
import AdminServicePanel from "../BookingsHelpers/AdminServicePanel";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [fetchedFeedBacks, setFetchedFeedbacks] = useState([]);
    const [fetchedBookings, setFetchedBookings] = useState([]);

    const [selectedOptionNavigation, setselectedOptionNavigation] = useState(1);
    const [selectedRoom, setSelectedRoom] = useState({
        type: "",
        room: {},
    });

    const [bookings, setBookings] = useState({
        normalRoom: [],
        suiteRoom: [],
        totalPrice: 0,
        date: "",
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            navigate("/auth/login");
        }
        fetch("http://localhost:8000/api/admin/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "admin",
                password: "admin",
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((dat) => {
                setFetchedFeedbacks(dat);
            })
            .catch((err) => {
                console.log(err);
            });
        fetch("http://localhost:8000/api/booking/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((dat) => {
                const roomsBooking = dat.map((ele, ind) => {
                    // Format the new date as a string (you can adjust the format as needed)
                    // let checkoutDate = startDate.toISOString().split("T")[0];

                    const booking = {
                        name: ele.customer_id,
                        totalPrice: ele.amount,
                        checkIn: ele.checkin,
                        day: ele.day,
                    };

                    return booking;
                });
                setFetchedBookings(roomsBooking);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleLogout = (event) => {
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    const [changedPrice, setChangedPrice] = useState(0);

    // box selection handleds
    const selectionHandler = (room) => {
        const isNormal = room.roomTitle.length <= 3;

        if (Object.keys(selectedRoom.room).length > 0) {
            deselectionHandler(selectedRoom.room);
        }

        if (isNormal) {
            setSelectedRoom({ type: "normal", room: room });
        } else {
            setSelectedRoom({ type: "suite", room: room });
        }
    };
    const deselectionHandler = (room) => {
        setSelectedRoom({ type: "", room: {} });
    };

    // details changing handler
    const roomDeleteHandler = () => {};

    const editDetailsHandler = () => {};

    // to enable edit button
    const editButtonEnable = changedPrice > 0;

    let selectedRoomComponent = (
        <p
            className={`text-center text-2xl font-bold text-gray-200 select-none`}
        >
            Select a room to edit details
        </p>
    );

    if (Object.keys(selectedRoom.room).length > 0) {
        selectedRoomComponent = (
            <div className={`flex flex-col justify-between w-full h-full`}>
                <div
                    className={`flex flex-col justify-start gap-4 h-full items-center w-full select-none`}
                >
                    <p className={`text-gray-200 text-4xl font-bold`}>Edit</p>
                    <p className={`text-gray-200 text-2xl font-semibold`}>
                        {selectedRoom.room.roomTitle}
                    </p>

                    <section className={` w-full`}>
                        <div className={`flex justify-between w-full text-xl`}>
                            <span className={`text-gray-300 self-start`}>
                                Price
                            </span>
                            <div
                                className={`flex gap-4 text-right self-end w-max`}
                            >
                                <span className={`text-gray-300`}>&#8377;</span>
                                <input
                                    placeholder={selectedRoom.room?.price}
                                    className={`text-gray-200 font-bold bg-slate-600 rounded-md w-1/2 px-2 py-1 text-sm`}
                                    onChange={(e) => {
                                        setChangedPrice(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <span></span>
                    </section>
                </div>
                <div className={`flex flex-col gap-5`}>
                    <div className=''>
                        <Link
                            to='/paymentack'
                            className={`text-xl text-white font-semibold text-center h-12 bg-red-600 flex items-center w-full rounded-lg justify-center   hover:cursor-pointer hover:bg-red-500`}
                        >
                            <button
                                disabled={!editButtonEnable}
                                onClick={editDetailsHandler}
                            >
                                Delete room
                            </button>
                        </Link>
                    </div>
                    <div className=''>
                        <Link
                            to='/paymentack'
                            className={`text-xl text-white font-semibold text-center h-12 bg-green-600 flex items-center w-full rounded-lg justify-center   hover:cursor-pointer 
                        ${
                            editButtonEnable
                                ? "hover:bg-green-500"
                                : "opacity-50 cursor-not-allowed"
                        }`}
                        >
                            <button
                                disabled={!editButtonEnable}
                                onClick={editDetailsHandler}
                            >
                                Edit Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`w-4/5 h-5/6 bg-slate-800 rounded-lg shadow-lg flex flex-col `}
        >
            <nav
                className={`h-[10%] flex justify-between w-full px-10 items-center`}
            >
                <h1 className={`text-gray-200 text-4xl`}>
                    The LNM Institute of Information Technology
                </h1>
                <button
                    onClick={handleLogout}
                    className={`text-red-400 text-2xl`}
                >
                    Logout
                </button>
            </nav>
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
                        Room Details
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
                        className={`w-4/5 py-6 px-8 border-r-2 border-slate-500`}
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
                    <BookingsTable bookings={fetchedBookings} />
                    <AdminServicePanel />
                    {/* {bookings.normalRoom.length + bookings.suiteRoom.length >
                    0 ? (
                        <BookingsTable bookings={bookings} />
                    ) : (
                        <p className={`text-bold text-gray-200 text-4xl`}>
                            All Bookings will be displayed here.
                        </p>
                    )} */}
                </main>
            )}
        </div>
    );
}
