import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add real login logic here
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img src="/logo.png" alt="Bluestock" className="mx-auto h-10 w-auto" />
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900 tracking-wide">
            BLUESTOCK
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot Password?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="h-4 w-4 text-indigo-600" />
              <label htmlFor="remember" className="text-sm text-gray-700">Keep me signed in</label>
            </div>

            <div>
              {/* Simulated reCAPTCHA */}
              <div className="border border-gray-300 p-2 rounded-md flex items-center justify-between">
                <span className="text-sm text-gray-700">I'm not a robot</span>
                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="captcha" className="h-6" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </div>
          </div>

          {/* OR divider */}
          <div className="relative text-center">
            <span className="text-sm text-gray-400 bg-white px-2">or sign in with</span>
            <hr className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-gray-300" />
          </div>

          <div>
            <button className="w-full bg-gray-100 border border-gray-300 py-2 rounded-md text-sm flex justify-center items-center space-x-2 hover:bg-gray-200">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-indigo-600 font-medium mt-4">
            <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
