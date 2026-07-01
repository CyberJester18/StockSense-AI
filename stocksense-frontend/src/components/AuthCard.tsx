import { useState } from "react";
import { signUp, signIn } from "../services/auth";

export function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const result = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage(
        isLogin
          ? "Login successful."
          : "Account created successfully."
      );
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-center text-2xl font-bold">
        {isLogin ? "Login" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold"
        >
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>

      </form>

      {message && (
        <p className="mt-4 text-center text-sm">
          {message}
        </p>
      )}

      <button
        onClick={()=>setIsLogin(!isLogin)}
        className="mt-6 w-full text-sm text-blue-400"
      >
        {isLogin
          ? "Create a new account"
          : "Already have an account?"}
      </button>

    </div>
  );
}