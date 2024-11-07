import { useSelector } from 'react-redux';

export default function Userinfo() {
    const user = useSelector((state) => state.user.user);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className=" min-h-screen">
            <div className=" p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Welcome to My Profile</h2>
                <div className='ml-32 mt-4'>
                    <p className='mb-2 text-xl'><strong>First Name:</strong> {user.firstName}</p>
                    <p className='mb-2 text-xl'><strong>Last Name:</strong> {user.lastName}</p>
                    <p className='mb-2 text-xl'><strong>Email:</strong> {user.email}</p>
                    <p className='mb-2 text-xl'><strong>Username:</strong> {user.username}</p>
                    <p className='mb-2 text-xl'><strong>Points:</strong> {user.Points}</p>
                </div>
            </div>
        </div>
    );
}
