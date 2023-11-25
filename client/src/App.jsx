import LoginForm from "./components/LoginForm";
import FacultyRegistration from "./components/RegisterForms.jsx/FacultyRegistration";
import RelativeRegistration from "./components/RegisterForms.jsx/RelativeRegistration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EntryQuestions from "./components/EntryQuestions.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

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
