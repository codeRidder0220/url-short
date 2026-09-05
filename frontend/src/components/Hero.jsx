import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-73px)]">
        <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          
          <p className="mb-4 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
            Simple. Fast. Reliable.
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
            Turn long links into short,
            <span className="block text-slate-500">
              shareable URLs.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Create short and simple links in seconds. Keep all your links
            organized in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#shorten"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Shorten a URL
            </a>

            <LinkButton />
          </div>

        </section>
      </main>
    </>
  );
}

function LinkButton() {
  return (
    <a
      href="#how-it-works"
      className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      How it works
    </a>
  );
}

export default Home;