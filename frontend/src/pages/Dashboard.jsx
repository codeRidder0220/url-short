import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"
import { useState, useEffect } from "react";
import { apiRequest } from "../services/api.js";


function Dashboard() {

    const { token } = useAuth();

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [links, setLinks] = useState([]);
    const [loadingLinks, setLoadingLinks] = useState(true);
    const [linksError, setLinksError] = useState("");
    const [shortenLoading, setShortenLoading] = useState(false);
    const [shortenError, setShortenError] = useState("");
    const [shortenSuccess, setShortenSuccess] = useState("");

    //fetch all links => 
    useEffect(() => {

        setLoadingLinks(true);
        setLinksError("");


        const fetchLinks = async () => {
            try {
                const { response, data } = await apiRequest("/codes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    setLinksError(
                        typeof data.error === "string" ? data.error : "Unable to fetch links"
                    );
                    return;
                }

                setLinks(data.codes);

            } catch (error) {
                console.log("Fetch Links Error:", error);
                setLinksError("Unable to connect to server");
            } finally {
                setLoadingLinks(false);
            }

        };
        if (token) {
            fetchLinks();
        }
    }, [token])

    //handle shorten =>
    const handleShorten = async (e) => {
        e.preventDefault();

        setShortenError("");
        setShortenSuccess("");

        if (!url.trim()) {
            setShortenError("Please enter a url");
            return;
        }

        setShortenLoading(true);

        try {
            const { response, data } = await apiRequest("/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    url,
                    code: code || undefined,
                }),
            });


            // console.log("shorten response: ", data);

            if (!response.ok) {
                setShortenError(
                    typeof data.error === "string" ? data.error : "Unable to shorten URL"
                );
                return;
            }

            setLinks((prevLinks) => [data, ...prevLinks]);

            setUrl("");
            setCode("");
            setShortenSuccess("URL shortened successfully!")


        } catch (error) {
            console.log("Shorten Error: ", error);
            setShortenError("Unable to connect to server");
        } finally {
            setShortenLoading(false);
        }
    }

    //hablde deletion =>
    const handleDelete = async (id) => {

        alert("Are you sure to delete!!");

        try {
            const { response, data } = await apiRequest(`/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.log("delted error: ", data);
                return;
            }

            console.log("deleted success: ", data);

            setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));

        } catch (error) {
            console.log("DELETE ERROR:", error);

        }
    }






    return (
        <main className="min-h-screen bg-green-50">
            {/* Header */}
            <header className="border-b border-green-100 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-green-900">
                            Shortify
                        </h1>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg px-3 py-2 bg-green-900 text-sm font-medium text-gray-100 transition hover:bg-green-800 hover:text-green-100 sm:px-4 hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                {/* Welcome */}
                <section>
                    <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">
                        Welcome back
                    </h2>

                    <p className="mt-2 text-sm text-slate-800 sm:text-base">
                        Create and manage your short links from one place.
                    </p>
                </section>

                {/* Create URL Card */}
                <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

                    <div>
                        <h3 className="text-2xl font-semibold text-slate-900">
                            Create a short URL
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter your long URL and optionally choose a custom code.
                        </p>
                    </div>

                    {shortenError && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {shortenError}
                        </p>
                    )}

                    {shortenSuccess && (
                        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                            {shortenSuccess}
                        </p>
                    )}

                    <form onSubmit={handleShorten} className="mt-6 space-y-5">

                        {/* URL */}
                        <div>
                            <label
                                htmlFor="url"
                                className="mb-2 block text-sm font-semibold text-slate-900"
                            >
                                Long URL
                            </label>

                            <input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com/very-long-url"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-800 focus:ring-1 focus:ring-green-800"
                            />
                        </div>

                        {/* Custom Code + Button */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                            <div className="flex-1">
                                <label
                                    htmlFor="code"
                                    className="mb-2 block text-sm font-semibold text-slate-900"
                                >
                                    Custom code
                                </label>

                                <input
                                    id="code"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="my-link"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-800 focus:ring-1 focus:ring-green-800"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={shortenLoading}
                                className="rounded-lg bg-green-900 px-6 py-3 font-medium text-white transition hover:bg-green-700 hover:cursor-pointer"
                            >
                                {shortenLoading ? "Shortening..." : "Shorten URL"}
                            </button>

                        </div>

                    </form>
                </section>

                {/* Links Section */}
                <section className="mt-10">

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-green-900">
                                Your Links
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage the URLs you have created.
                            </p>
                        </div>
                    </div>

                    {/* Link Card */}
                    <div className="mt-5 space-y-4">

                        {loadingLinks && (
                            <p className="mt-5 text-sm text-slate-500">
                                Loading your links...
                            </p>
                        )}

                        {linksError && (
                            <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                {linksError}
                            </p>
                        )}


                        {!loadingLinks && !linksError && links.map((link) => (
                            <div
                                key={link.id}
                                className="rounded-2xl bg-white p-5 shadow-sm"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-slate-500">
                                            Original URL
                                        </p>

                                        <p className="mt-1 truncate text-sm text-slate-800">
                                            {link.targetURL}
                                        </p>

                                        <p className="mt-4 text-sm font-medium text-slate-500">
                                            Short URL
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-green-800">
                                            {link.shortCode}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    `${import.meta.env.VITE_API_URL}/${link.shortCode}`
                                                );
                                            }}
                                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Copy
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                window.open(
                                                    `${import.meta.env.VITE_API_URL}/${link.shortCode}`,
                                                    "_blank"
                                                );

                                            }}
                                            className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-green-800 transition hover:bg-green-50"
                                        >
                                            Open
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(link.id)}
                                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}

                        {!loadingLinks && !linksError && links.length === 0 && (
                            <div className="mt-5 rounded-2xl bg-white p-8 text-center shadow-sm">
                                <p className="text-sm text-slate-500">
                                    You haven't created any short links yet.
                                </p>
                            </div>
                        )}

                    </div>

                </section>

            </div>
        </main>
    );
}

export default Dashboard;