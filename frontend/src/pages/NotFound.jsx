import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-background px-4">
      <h1 className="text-7xl font-bold text-primary mb-2">404</h1>
      <p className="text-xl font-medium text-secondary mb-4">
        Nyaa~ Page Not Found!
      </p>
      <p className="mb-6 text-secondary/60">
        It looks like you wandered into the void. Let’s go back to safety.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
