// components/Navbar.js
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/redux/slices/userSlice';
export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem('token');
    };
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 border border-b-2">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <Link href="/">
                    <p className="flex-none font-semibold text-2xl text-black focus:outline-none focus:opacity-80">NexoRand</p>
                </Link>

                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                    {user ? (
                        <div className='flex items-center gap-6'>
                            <Link className="font-medium text-sm text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="/Userinfo">
                                My Account</Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center font-medium text-sm bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/Login">
                            <p className="font-medium text-xl text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                                Login
                            </p>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
