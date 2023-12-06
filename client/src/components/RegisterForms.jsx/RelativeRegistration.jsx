import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const RelativeRegistrations = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [step, setStep] = useState(1);
    const [guestName, setGuestName] = useState("");
    const [studentRollNo, setStudentRollNo] = useState("");
    const [studentName, setStudentName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const rollNoRegex =
        /^(?!00)[1-9][0-9](UCS|DCS|UCC|UEC|DEC|UME|PMT|PPH|PME|PEC|PCS)(?!000)[0-9]{3}$/i;

    const userNameRegex = /^[a-z0-9]{4,10}$/i;
    const userNameRegexMatch = username.match(userNameRegex);

    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)?$/i;
    const guestNameRegexMatch = guestName.match(nameRegex);
    const studentNamRegexMatch = studentName.match(nameRegex);

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
        // event.preventDefault();
        // Perform registration logic here
        const res = await fetch(
            "http://localhost:8000/api/register/user/student/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: guestName,
                    RollNo: studentRollNo,
                    email: username,
                    password,
                }),
            }
        );
        const data = await res.json();

        const { status, token, user } = data;

        if (status === 404 || status === 403) {
            setError("Something's wrong");
        } else if (status === 200) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            navigate("/dashboard");
        }
    };

    return (
        <form
            className='flex flex-col items-center justify-center h-screen bg-gray-900'
            onSubmit={handleSubmit(handleRegister)}
        >
            {step === 1 && (
                <div className='flex flex-col bg-gray-800 p-8 rounded-lg'>
                    <h2 className='text-2xl font-bold text-white mb-4'>
                        Step 1: Guest Information
                    </h2>
                    <input
                        {...register("guestName", { required: true })}
                        type='text'
                        placeholder='Guest Name'
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    <input
                        {...register("studentRollNo", { required: true })}
                        type='text'
                        name='studentRollNo'
                        placeholder='Student Roll No'
                        value={studentRollNo}
                        onChange={(e) => setStudentRollNo(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />

                    <input
                        {...register("studentName", { required: true })}
                        type='text'
                        placeholder='Student Name'
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    {studentRollNo.length &&
                    !studentRollNo.match(rollNoRegex) ? (
                        <div className={`text-red-500 mb-2`}>
                            Invalid Roll No.
                        </div>
                    ) : (
                        <></>
                    )}
                    {guestName.length && !guestNameRegexMatch ? (
                        <div className={`text-red-500 mb-2 w-80`}>
                            Guest Name should not contain any special characters
                        </div>
                    ) : (
                        <></>
                    )}
                    {studentName.length && !studentNamRegexMatch ? (
                        <div className={`text-red-500 mb-2 w-80`}>
                            Student Name should not contain any special
                            characters
                        </div>
                    ) : (
                        <></>
                    )}
                    <button
                        onClick={handleNextStep}
                        disabled={
                            !guestName ||
                            !studentRollNo ||
                            !studentName ||
                            !studentRollNo.match(rollNoRegex)
                        }
                        className={`bg-blue-500 text-white px-4 cursor-pointer py-2 rounded-lg ${
                            (!guestName ||
                                !studentRollNo ||
                                !studentName ||
                                !studentRollNo.match(rollNoRegex)) &&
                            "opacity-50 cursor-not-allowed"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className='flex flex-col bg-gray-800 p-8 rounded-lg'>
                    <h2 className='text-2xl font-bold text-white mb-4'>
                        Step 2: Account Information
                    </h2>
                    <input
                        {...register("username", {
                            required: true,
                        })}
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    <input
                        {...register("password", { required: true })}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-700 text-white px-4 py-2 rounded-lg mb-4'
                    />
                    <input
                        {...register("repassword", { required: true })}
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
                            Username should be between 4 to 10 characters, can
                            contain only a-z, 0-9, and no special characters
                        </div>
                    ) : (
                        <></>
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

export default RelativeRegistrations;
