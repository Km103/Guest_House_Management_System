import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import FacultyRegistration from "./components/RegisterForms.jsx/FacultyRegistration";
import RelativeRegistration from "./components/RegisterForms.jsx/RelativeRegistration";
import EntryQuestions from "./components/EntryQuestions.jsx";
import ErrorPage from "./components/pages/ErrorPage.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import PaymentAck from "./components/pages/PaymentAck.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <EntryQuestions />,
        errorElement: <ErrorPage />,
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
]);

function App() {
    return (
        <div
            className={`flex flex-col h-screen w-full items-center justify-center`}
        >
            <RouterProvider router={router} />;
        </div>
    );
}

export default App;
