import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    // Your login logic goes here
    console.log({ email, password })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md px-8 py-10 shadow-lg border rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            <span className="text-violet-600">▮▮</span> BLUESTOCK
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="johndoe@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="float-right text-xs text-blue-600 cursor-pointer hover:underline">Forgot Password?</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-violet-600" />
            <label className="text-sm text-gray-700">Keep me signed in</label>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-400">or sign in with</div>

          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-2" alt="Google" />
            Continue with Google
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/register" className="text-sm text-blue-600 hover:underline">
            Create an account
          </a>
        </div>
      </div>
    </div>
  )
}
