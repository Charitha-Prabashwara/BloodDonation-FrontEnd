import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import API from '../../api/api';
import './styles.css';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            API.post('/user/verify', { token })
                .then((response) => {
                    setMessage(response.data.message);
                })
                .catch((err) => {
                    if (err.response) {
                        setError(err.response.data.message);
                    } else if (err.request) {
                        setError("Cannot connect to server. Please try again later.");
                    } else {
                        setError(err.message);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <section className="bg-blue-200 min-h-screen flex items-center justify-center">
            <div className="bg-[#fdfefff5] flex flex-col items-center rounded-2xl shadow-lg max-w-3xl p-8 ml-5 mr-5 text-center">
                {!token && (
                    <>
                        <h2 className="text-2xl font-bold text-[#4527a5] mb-4">
                            Invalid Account Verification Request
                        </h2>
                        <p className="text-lg text-gray-700">
                            Your account verification request is invalid because a verification token wasn't found in your request.
                        </p>
                    </>
                )}

                {loading && token && <p className="text-lg text-gray-600">Verifying your account...</p>}

                {!loading && message && (
                    <>
                        <h2 className="text-2xl font-bold text-[#4527a5] mb-4">{message}</h2>
                        <p className="text-lg text-gray-700">You're now a verified user. Please log in.</p>
                        <button
                            className="mt-6 py-2 px-6 bg-[#4527a5] text-white rounded-lg hover:bg-[#341d8e] transition"
                            onClick={() => (window.location.href = '/login')}
                        >
                            Go to Login
                        </button>
                    </>
                )}

                {!loading && error && (
                    <>
                        <h2 className="text-2xl font-bold text-[#4527a5] mb-4">{error}</h2>
                        <p className="text-lg text-gray-700">Something went wrong.</p>
                        <button
                            className="mt-6 py-2 px-6 bg-[#4527a5] text-white rounded-lg hover:bg-[#341d8e] transition"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default Verify;
