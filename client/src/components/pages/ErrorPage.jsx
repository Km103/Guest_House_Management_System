import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div
            className={`w-2/5 h-2/5 text-white flex flex-col justify-center items-center gap-10`}
        >
            <p className={`text-4xl`}>Page not found</p>
            <p className={`text-6xl`}>404</p>
            <Link
                to='/auth/login'
                className={`text-xl w-3/5 text-white font-semibold text-center h-12 bg-blue-600 flex items-center rounded-lg justify-center   cursor-pointer hover:bg-blue-500`}
            >
                Back
            </Link>
        </div>
    );
}
