import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Modal from './Modal';

export default function Leaderboard() {
    const [friends, setFriends] = useState([]);
    const [time, settime] = useState('daily'); // 'daily' by default
    const token = useSelector((state) => state.user.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        async function fetchFriends() {
            try {
                const endpoint = {
                    daily: `${apiUrl}/api/user/v1/your-daily-history`,
                    weekly: `${apiUrl}/api/user/v1/your-weekly-history`,
                    monthly: `${apiUrl}/api/user/v1/your-monthly-history`,
                };

                const response = await axios.get(endpoint[time], {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setFriends(response.data.data);
                } else {
                    console.error('Failed to fetch friends');
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        }

        if (token) fetchFriends();
    }, [token, time]);

    const handleModalOpen = (username) => {
        setSelectedUsername(username);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUsername(null);
    };

    const sortedFriends = [...friends].sort((a, b) => (b.totalPointsAwarded || b.totalPoints) - (a.totalPointsAwarded || a.totalPoints));
    const topThreeFriends = sortedFriends.slice(0, 3);

    return (
        <div>
            <section className='mx-24'>
                <div className="bg-blue-600 flex justify-between items-center py-4 px-4">
                    <div className="leaderboard flex justify-center items-center gap-2">
                        <Link href="/Leaderboard">
                            <p className="text-2xl text-white">LeaderBoard</p>
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center my-2">
                    <div className="flex justify-center items-center gap-2 transition duration-300">
                        <button
                            className={`text-sm rounded-2xl px-4 py-2 ${time === 'daily' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => settime('daily')}
                        >
                            Daily
                        </button>
                        <button
                            className={`text-sm rounded-2xl px-4 py-2 ${time === 'weekly' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => settime('weekly')}
                        >
                            Weekly
                        </button>
                        <button
                            className={`text-sm rounded-2xl px-4 py-2 ${time === 'monthly' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => settime('monthly')}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
                <div className="top-three-friends flex justify-between mx-12">
                    {topThreeFriends.map((friend) => (
                        <div
                            key={friend._id}
                            className="flex flex-col text-center justify-between mx-4 my-4 cursor-pointer hover:text-blue-500"
                            onClick={() => handleModalOpen(friend._id)}
                        >
                            <div>
                                <p>{friend._id}</p>
                            </div>
                            <div className="text-green-600">{friend.totalPointsAwarded || friend.totalPoints}</div>
                            <div>
                                <p className="text-red-500">Prize: ${friend.totalPointsAwarded || friend.totalPoints}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="friends mt-10 flex flex-col">
                    {sortedFriends.length > 0 ? (
                        <table className=" text-sm text-left bg-white">
                            <tbody>
                                {sortedFriends.map((friend) => (
                                    <tr
                                        key={friend._id}
                                        className="cursor-pointer border-b hover:bg-slate-100 transition duration-300"
                                        onClick={() => handleModalOpen(friend._id)}
                                    >
                                        <td className="px-6 py-4 text-gray-900 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={12} height={12} color={"#000000"} fill={"none"}>
                                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                            <p>{friend._id}</p>
                                        </td>
                                        <td className="px-6 py-4 text-red-600">Prize : ${friend.totalPointsAwarded || friend.totalPoints}</td>
                                        <td className="px-6 py-4 text-green-600">${friend.totalPointsAwarded || friend.totalPoints}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="p-4 text-gray-500">No friends found</p>
                    )}
                </div>
            </section>

            {isModalOpen && (
                <Modal username={selectedUsername} onClose={handleModalClose} />
            )}
        </div>
    );
}
