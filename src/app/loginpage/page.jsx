"use client";
import { useState } from "react";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function Login() {
  const { setUser } = useUserContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailValidation = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {

      setEmailError("Email is required");
      return false;
      
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const passwordValidation = () => {
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {

      setPasswordError("Password must be at least 8 characters long");
      return false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    } else if (!specialCharRegex.test(password)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setEmailError("");
    setPasswordError("");
    
    const isEmailValid = emailValidation();
    const isPasswordValid = passwordValidation();

    if (isEmailValid && isPasswordValid) {
      try {
        setIsSubmitting(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser({ email, password });
        
        router.replace("/");
      } catch (error) {
        setPasswordError("Login failed. Please check your credentials.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="text-black flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onBlur={emailValidation}
              className={`w-full px-4 py-2 mt-1 bg-gray-100 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-blue-300`}
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby="email-error"
            />
            {emailError && (
              <p 
                id="email-error" 
                className="mt-1 text-sm text-red-500"
              >
                {emailError}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              onBlur={passwordValidation}
              className={`w-full px-4 py-2 mt-1 bg-gray-100 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-blue-300`}
              aria-invalid={passwordError ? "true" : "false"}
              aria-describedby="password-error"
            />
            {passwordError && (
              <p 
                id="password-error" 
                className="mt-1 text-sm text-red-500"
              >
                {passwordError}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded-md ${
              isSubmitting 
                ? "bg-blue-300 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;