import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FacultyRegistration = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [facultyName, setFacultyName] = useState("");
    const [facultyEmail, setFacultyEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [error, setError] = useState("");

    const facultyEmailRegex = /^[a-zA-Z0-9._%+-]+@lnmiit\.ac\.in$/i;
    const facultyEmailRegexMatch = facultyEmail.match(facultyEmailRegex);

    const userNameRegex = /^[a-z0-9]{4,10}$/i;
    const userNameRegexMatch = username.match(userNameRegex);

    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
    const passwordRegexMatch = password.match(passwordRegex);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        // Perform registration logic here
        const { data } = await fetch(
            "http://localhost:8000/api/register/user/faculty/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    facultyName,
                    facultyEmail,
                    password,
                }),
            }
        );

        const { status } = data;

        if (status === 404 || status === 403) {
            setError("Something's wrong");
        } else if (status === 200) {
            navigate("/dashboard");
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className='flex flex-col items-center justify-center h-screen bg-gray-900'
        >
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
                    {facultyEmail.length && !facultyEmailRegexMatch ? (
                        <div className={`text-red-500 mb-2`}>
                            Not a valid LNMIIT email
                        </div>
                    ) : (
                        <></>
                    )}
                    <button
                        onClick={handleNextStep}
                        disabled={!facultyName || !facultyEmail}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                            (!facultyEmail ||
                                !facultyName ||
                                !facultyEmailRegexMatch) &&
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
                    {password.length && !passwordRegexMatch ? (
                        <div className={`text-red-500 mb-2 w-80 text-center`}>
                            Password must contain at least 8 characters, one
                            letter, one number and one special character
                        </div>
                    ) : (
                        <></>
                    )}
                    {password &&
                        reenterPassword &&
                        password !== reenterPassword && (
                            <div className={`text-red-500 mb-2`}>
                                Passwords do not match
                            </div>
                        )}
                    {username.length && !userNameRegexMatch ? (
                        <div className={`text-red-500 mb-2 w-80 text-center`}>
                            Username can contain only a-z, 0-9, and no special
                            characters
                        </div>
                    ) : (
                        <></>
                    )}
                    {error.length > 0 && (
                        <div className={`w-80 text-red-400 text-center`}>
                            {error}
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
                            type='submit'
                            disabled={
                                !username ||
                                !password ||
                                password !== reenterPassword ||
                                !userNameRegexMatch
                            }
                            className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
                                (!username ||
                                    !password ||
                                    password !== reenterPassword ||
                                    !userNameRegexMatch) &&
                                "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Register
                        </button>
                    </div>
                </div>
            )}
            <Link
                to='/'
                className='text-white text-center h-12 bg-blue-600 flex items-center w-full rounded-lg justify-center hover:bg-transparent text-xl hover:border-2 hover:border-blue-600 hover:cursor-pointer hover:text-blue-500'
            >
                Back to home
            </Link>
        </form>
    );
};

export default FacultyRegistration;
