import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Modal from './Modal';

export default function Leaderboard() {
    const [friends, setFriends] = useState([]);
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState(null);

    useEffect(() => {
        async function fetchFriends() {
            try {
                const response = await axios.get('http://localhost:7000/api/user/v1/get-users', {
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
    }, [token]);

    const handleModalOpen = (username) => {
        setSelectedUsername(username);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedUsername(null);
    };

    let topThreeFriends = friends.slice(0, 3);

    return (
        <div>
            <section>
                <div className="bg-blue-600 flex justify-between items-center py-4 px-4">
                    <div className="leaderboard flex justify-center items-center gap-2">
                        <Link href="/Leaderboard">
                            <p className="text-2xl text-white">LeaderBoard</p>
                        </Link>
                        {/* Icon */}
                    </div>
                </div>
                <div className="top-three-friends flex justify-between mx-12">
                    {topThreeFriends
                        .sort((a, b) => b.Points - a.Points)
                        .map((friend) => (
                            <div
                                key={friend._id}
                                className="flex flex-col text-center justify-between mx-4 my-4 cursor-pointer hover:text-blue-500"
                                onClick={() => handleModalOpen(friend.username)}
                            >
                                <div>
                                    <p>{friend.firstName}</p>
                                </div>
                                <div className="text-green-600">{friend.Points}</div>
                                <div>
                                    <p className="text-red-500">Prize: ${friend.Points}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="friends mt-10 flex flex-col bg-gray-200">
                    {friends.length > 0 ? (
                        friends
                            .sort((a, b) => b.Points - a.Points)
                            .map((friend) => (
                                <div
                                    key={friend._id}
                                    className="flex justify-between px-4 my-2 py-6 hover:bg-slate-300 cursor-pointer hover:text-blue-500 transition duration-300"
                                    onClick={() => handleModalOpen(friend.username)}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Icon */}
                                        <p>{friend.firstName}</p>
                                    </div>
                                    <div>
                                        <p className="text-red-500">Prize: ${friend.Points}</p>
                                    </div>
                                    <div className="text-green-600">{friend.Points}</div>
                                </div>
                            ))
                    ) : (
                        <p>No friends found</p>
                    )}
                </div>
            </section>

            {isModalOpen && (
                <Modal username={selectedUsername} onClose={handleModalClose} />
            )}
        </div>
    );
}
