import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="text-xl font-bold text-green-900">
          Shortify
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-green-900 transition hover:text-slate-950 sm:px-4"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-green-900 px-3 py-2 text-sm font-bold text-green-100 transition hover:bg-slate-700 sm:px-4"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;