import React, { useState } from "react";
import { Link } from "react-router-dom";

const EntryQuestions = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

    const handleNext = () => {};

    return (
        <div className='bg-gray-900 flex flex-col border-gray-300 w-max roundex-md gap-4 text-white p-4'>
            <h3 class=' font-semibold text-2xl text-gray-900 dark:text-white'>
                You are/belong to
            </h3>
            <ul class='w-60 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                <li class='w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 '>
                    <div class='flex items-center ps-3'>
                        <input
                            id='list-radio-license'
                            type='radio'
                            value=''
                            name='list-radio'
                            onClick={() => {
                                setSelectedOption("faculty");
                                setNextButtonEnabled(true);
                            }}
                            class='w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                        />
                        <label
                            for='list-radio-license'
                            class='w-full py-3 ms-2 cursor-pointer text-lg font-medium text-gray-900 dark:text-gray-300'
                        >
                            Faculty
                        </label>
                    </div>
                </li>
                <li class='w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600'>
                    <div class='flex items-center ps-3'>
                        <input
                            id='list-radio-id'
                            type='radio'
                            value=''
                            name='list-radio'
                            onClick={() => {
                                setSelectedOption("relative");
                                setNextButtonEnabled(true);
                            }}
                            class='w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                        />
                        <label
                            for='list-radio-id'
                            class='w-full cursor-pointer py-3 ms-2 text-lg font-medium text-gray-900 dark:text-gray-300'
                        >
                            Relative of a Student
                        </label>
                    </div>
                </li>
                <li class='w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600'>
                    <div class='flex items-center ps-3'>
                        <input
                            id='list-radio-military'
                            type='radio'
                            value=''
                            name='list-radio'
                            onClick={() => {
                                setSelectedOption("tpcrc");
                                setNextButtonEnabled(true);
                            }}
                            class='w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                        />
                        <label
                            for='list-radio-military'
                            class='w-full py-3 ms-2 cursor-pointer text-lg font-medium text-gray-900 dark:text-gray-300'
                        >
                            TPCRC
                        </label>
                    </div>
                </li>
            </ul>
            <Link to={`/auth/register/${selectedOption}`}>
                <button
                    onClick={handleNext}
                    disabled={!nextButtonEnabled}
                    className={`bg-blue-600 hover:bg-blue-500 text-white w-full px-4 py-2 rounded-lg ${
                        !nextButtonEnabled && "opacity-50 cursor-not-allowed"
                    }`}
                >
                    Next
                </button>
            </Link>
            <p className='text-white'>
                Already registered ?
                <Link to='/auth/login' className={`hover:text-blue-500`}>
                    Login
                </Link>
            </p>
        </div>
    );
};

export default EntryQuestions;
