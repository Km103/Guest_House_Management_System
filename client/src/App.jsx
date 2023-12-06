import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import FacultyRegistration from "./components/RegisterForms.jsx/FacultyRegistration";
import RelativeRegistration from "./components/RegisterForms.jsx/RelativeRegistration";
import EntryQuestions from "./components/EntryQuestions.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import PaymentAck from "./components/pages/PaymentAck.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";

import userContext from "./context/UserContext.js";
import { useState } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <EntryQuestions />,
    },
    {
        path: "/auth/register/faculty",
        element: <FacultyRegistration />,
    },
    {
        path: "/auth/register/relative",
        element: <RelativeRegistration />,
    },
    {
        path: "/auth/register/tpcrc",
        element: <LoginForm />,
    },
    {
        path: "/auth/register/admin",
        element: <LoginForm />,
    },
    {
        path: "/auth/login",
        element: <LoginForm />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/paymentack",
        element: <PaymentAck />,
    },
    {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

function App() {
    const [user, setUser] = useState({});
    return (
        <userContext.Provider value={{ user, setUser }}>
            <div
                className={`flex flex-col h-screen w-full items-center justify-center`}
            >
                <RouterProvider router={router} />;
            </div>
        </userContext.Provider>
    );
}

export default App;
