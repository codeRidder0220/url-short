import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx"

function Login() {

  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
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
          typeof data.error === "string"
            ? data.error
            : "Something went wrong"
        );
        return;
      }


      const token = data.data.token;
      login(token);
          
      setMessage("Login successful!");

      setFormData({
        email: "",
        password: "",
      });
      navigate("/dashboard");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-50">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4 py-10 sm:px-6">
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-800">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-700">
              Login to manage your short links.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-800 focus:ring-1 focus:ring-green-800"
              />
            </div>

            {/* Password */}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-800 focus:ring-1 focus:ring-green-800"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Success */}
            {message && (
              <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                {message}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-900 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-slate-900 hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}

export default Login;