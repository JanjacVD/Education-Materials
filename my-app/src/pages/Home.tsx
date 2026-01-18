import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Home Page</h1>
        <p className="mb-6">Welcome to your React Router app!</p>
        <nav className="space-x-4">
          <Link to="/about" className="text-blue-500 hover:underline">
            About
          </Link>
          <Link to="/lifecycle" className="text-blue-500 hover:underline">
            Lifecycle
          </Link>
        </nav>
      </div>
    </div>
  )
}
