"use client";

import { loginWithGoogle, loginWithGithub } from "../lib/login";

export default function LoginPage() {
  const handleGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      console.log("Google user:", result.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGithub = async () => {
    try {
      const result = await loginWithGithub();
      console.log("GitHub user:", result.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-sm bg-[#161b22] p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-white mb-3">Welcome Back</h2>
        <p className="text-gray-400 mb-8">Sign in to continue</p>

        <button
          onClick={handleGoogle}
          className="w-full py-3 rounded-lg bg-white text-black font-medium mb-4 hover:bg-gray-200 transition"
        >
          Login with Google
        </button>

        <button
          onClick={handleGithub}
          className="w-full py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}
