import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-8xl font-bold text-blue-500">404</h1>

      <h2 className="mt-6 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-center text-gray-400">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700"
      >
        Go Home
      </Link>
    </main>
  );
}