import React, { useState } from "react";

const FacultyRegistration = () => {
    const [step, setStep] = useState(1);
    const [facultyName, setFacultyName] = useState("");
    const [facultyEmail, setFacultyEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleRegister = () => {
        // Perform registration logic here
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-900'>
            {step === 1 && (
                <div className='flex flex-col items-center bg-gray-800 p-8 rounded-lg'>
                    <h2 className='text-2xl font-bold text-white mb-4'>
                        Step 1: Faculty Information
                    </h2>
                    <input
                        type='text'
                        placeholder='Faculty Name'
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    <input
                        type='email'
                        placeholder='Faculty Email'
                        value={facultyEmail}
                        onChange={(e) => setFacultyEmail(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    <button
                        onClick={handleNextStep}
                        disabled={!facultyName || !facultyEmail}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                            (!facultyEmail || !facultyName) &&
                            "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className='flex    flex-col bg-gray-800 p-8 rounded-lg'>
                    <h2 className='text-2xl font-bold text-white mb-4'>
                        Step 2: Account Information
                    </h2>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    <input
                        type='password'
                        placeholder='Re-enter Password'
                        value={reenterPassword}
                        onChange={(e) => setReenterPassword(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    {password &&
                        reenterPassword &&
                        password !== reenterPassword && (
                            <div className={`text-red-500 mb-2`}>
                                Passwords do not match
                            </div>
                        )}
                    <div
                        className={`flex flex-col justify-center items-center gap-4`}
                    >
                        <button
                            onClick={handlePreviousStep}
                            className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                        >
                            Back
                        </button>
                        <button
                            onClick={handleRegister}
                            disabled={
                                !username ||
                                !password ||
                                password !== reenterPassword
                            }
                            className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
                                (!username ||
                                    !password ||
                                    password !== reenterPassword) &&
                                "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Register
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyRegistration;
