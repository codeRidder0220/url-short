import { Link } from "react-router-dom";
import { useState } from "react";


function Signup() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/user/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                setError(
                    typeof data.error === "string" ? data.error : "Something went wrong"
                );
                return;
            }

            setMessage("Account created successfully!");
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
            });


        } catch (error) {
            setError("Unable to connect to server")
        } finally {
            setLoading(false);
        }
    }








    return (
        <main className="min-h-screen bg-green-50">
            <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10 sm:px-6">

                <div className="w-full rounded-2xl bg-white p-6 shadow-sm sm:p-8">

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-green-800">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-gray-700">
                            Start creating short links in seconds.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                        <div>
                            <label
                                htmlFor="firstname"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                First name
                            </label>

                            <input
                                id="firstname"
                                type="text"
                                placeholder="Enter your first name"
                                value={formData.firstname}
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="lastname"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Last name
                            </label>

                            <input
                                id="lastname"
                                type="text"
                                placeholder="Enter your last name"
                                value={formData.lastname}
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading} //request ke time multiple click nhi kr skta
                            className="w-full rounded-lg bg-green-900 px-4 py-3 font-medium text-white transition hover:bg-green-700"
                        >
                            {loading ? "Creating account..." : "create account"}
                        </button>

                        {error && (
                            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}
                        {message && (
                            <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                                {message}
                            </p>
                        )}

                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-slate-900 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}

export default Signup;