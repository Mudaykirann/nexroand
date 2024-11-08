import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Modal({ username, onClose }) {
    const [history, setHistory] = useState([]);


    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        async function fetchHistory() {
            console.log(apiUrl);
            try {
                const response = await axios.post(`${apiUrl}/api/user/v1/your-history`, { username });
                if (response.data.success) {
                    setHistory(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching points history:', error);
                console.log(error)
            }
        }
        fetchHistory();
    }, [username]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto animate-fadeIn">
                <h2 className="text-xl font-bold mb-4 text-center">test's History</h2>
                {history.length > 0 ? (
                    <ul className="points  space-y-2">
                        {history.map((entry) => (
                            <li
                                key={entry._id}
                                className="flex flex-col justify-between p-2 border-b border-gray-200 text-gray-700"
                            >
                                <span className="text-sm text-gray-500">Date: {entry.date}</span>
                                <span>Points Awarded : {entry.pointsAwarded}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No points history found.</p>
                )}

                <button onClick={onClose} className='mb-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded-md'>Close</button>
            </div>
        </div>
    );
}
