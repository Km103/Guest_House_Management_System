import React, { useState } from "react";

const RoomSelectionBox = ({
    roomTitle,
    price,
    selectRoomHandler,
    deselectRoomHandler,
}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        if (!isClicked) {
            console.log("selecting");
            selectRoomHandler({
                roomTitle,
                price,
            });
        } else {
            console.log("deselecting");
            deselectRoomHandler({
                roomTitle,
                price,
            });
        }
    };

    return (
        <div
            className={`rounded-md bg-slate-700  flex flex-col items-center justify-center border-4 px-10 py-2 transition-colors delay-50 duration-200 ${
                isClicked ? "border-green-500" : "border-slate-500"
            }`}
            onClick={handleClick}
        >
            <span className={`text-gray-200 text-lg select-none`}>
                {roomTitle}
            </span>
            <span className={`text-gray-400 text-md select-none `}>
                &#8377;{price}
            </span>
        </div>
    );
};

export default RoomSelectionBox;
