import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <p className="mb-4 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-slate-900">
            Simple. Fast. Reliable.
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-green-800 sm:text-5xl lg:text-7xl">
            Turn long links into short,
            <span className="block text-gray-800">
              shareable URLs.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
            Create short and simple links in seconds. Keep all your links
            organized in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#shorten"
              className="rounded-lg bg-green-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Shorten a URL
            </a>

            <a
              href="#how-it-works"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              How it works
            </a>
          </div>
        </section>

        {/* url pasting code */}

        <section
          id="shorten"
          className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
        >
          <div className="rounded-2xl border border-green-700 bg-green-300/10 p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="url"
                placeholder="Paste your long URL here..."
                className="min-w-0 flex-1 rounded-lg border bg-white border-gray-600 px-4 py-3 outline-none transition focus:border-slate-900"
              />

              <input
                type="text"
                placeholder="Custom code"
                className="w-full rounded-lg border bg-white border-gray-600 px-4 py-3 outline-none transition focus:border-slate-900 md:w-44"
              />

              <Link 
              to="/login"
              className="rounded-lg bg-green-900 px-6 py-3 font-medium text-white transition hover:bg-green-700">
                Shorten
              </Link>
            </div>

            <p className="mt-3 text-left text-sm text-slate-500">
              Custom code is optional. Leave it empty to generate one
              automatically.
            </p>
          </div>
        </section>

        {/*how it works */}

        <section
          id="how-it-works"
          className="border-t border-slate-200 bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500">
                HOW IT WORKS
              </p>

              <h2 className="mt-3 text-3xl font-bold text-green-800 sm:text-4xl">
                Shorten your links in three steps
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl bg-green-100/20 p-6 shadow-sm">
                <span className="text-sm font-bold text-slate-500">01</span>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  Paste your URL
                </h3>

                <p className="mt-2 text-slate-600">
                  Enter the long URL you want to shorten.
                </p>
              </div>

              <div className="rounded-xl bg-green-100/20 p-6 shadow-sm">
                <span className="text-sm font-bold text-slate-500">02</span>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  Create a short link
                </h3>

                <p className="mt-2 text-slate-600">
                  Generate a unique code or choose your own custom code.
                </p>
              </div>

              <div className="rounded-xl bg-green-100/20 p-6 shadow-sm">
                <span className="text-sm font-bold text-slate-500">03</span>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  Share anywhere
                </h3>

                <p className="mt-2 text-slate-600">
                  Copy your short link and share it wherever you want.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;