import { Label } from "@radix-ui/react-label";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/Auth/Login", {
        Email: email,
        Password: password,
      });
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-100 via-white to-gray-100 px-4">
      <Card className="w-full max-w-md p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200 bg-white">
        <CardTitle>
          <h2 className="text-3xl font-bold text-zinc-800 mb-1">Login</h2>
          <p className="text-sm text-zinc-600 font-light">
            Enter your email and password to continue.
          </p>
        </CardTitle>
        <CardDescription>
          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div className="flex flex-col space-y-1">
              <Label className="text-sm text-zinc-700">Email</Label>
              <Input
                name="email"
                // type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="text-sm text-zinc-700">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-lg bg-teal-600 hover:bg-teal-700 transition"
            >
              Login
            </Button>
          </form>
        </CardDescription>
      </Card>
    </div>
  );
};

export default Login;
