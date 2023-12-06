import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        validateForm();
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validateForm();
    };

    const validateForm = () => {
        setIsFormValid(username !== "" && password !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const data = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password,
            }),
        });
        console.log(data);

        // const { status } = data;
        // if (status === 404 || status === 403) {
        //     setError("Invalid username or password");
        //     setUsername("");
        //     setPassword("");
        // } else if (status === 200) {
        //     navigate("/dashboard");
        // }
    };

    return (
        <form
            className='flex flex-col items-center gap-3 justify-center h-screen bg-gray-900'
            onSubmit={handleSubmit}
        >
            <div className='bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold text-white mb-4'>Login</h2>
                <div className='mb-4'>
                    <label htmlFor='username' className='text-white'>
                        Username
                    </label>
                    <input
                        type='text'
                        id='username'
                        className='w-full bg-gray-700 text-white rounded-lg py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='text-white'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='w-full bg-gray-700 text-white rounded-lg py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    type='submit'
                    className={`bg-blue-600 text-white rounded-lg py-2 px-4 mt-4 ${
                        isFormValid ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid}
                    // onClick={handleSubmit}
                >
                    Login
                </button>
                {error.length > 0 && (
                    <div className={`w-80 text-red-400 text-center`}>
                        {error}
                    </div>
                )}

                <p className='text-white mt-4'>
                    Don't have an account?{" "}
                    <Link to='/' className={`hover:text-blue-500`}>
                        Register
                    </Link>
                </p>
            </div>
            <div className='text-white text-center h-12 bg-blue-600 flex items-center w-full rounded-lg justify-center hover:bg-transparent hover:border-2 hover:border-blue-600 hover:cursor-pointer hover:text-blue-500'>
                <Link to='/' className={`text-xl `}>
                    Back
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
