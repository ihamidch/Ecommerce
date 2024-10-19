import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added CardTitle import
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const description =
  "A sign up form with first name, last name, email, and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account.";

export default function LoginForm() {
  const [inputValues, setInputValues] = useState({});

  const handleChange = (e) => { // Fixed typo
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => { // Fixed typo
    e.preventDefault();
    axios.post("http://localhost:8000/api/v1/users/register"
      , inputValues,
      { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        toast.success(response?.data?.message, { autoClose: 2000 });
        setInputValues({});

      })
      .catch((error) => {
        toast.error(error.response.data.message, { autoClose: 2000 });

      })
  };
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <Card className="mx-auto max-w-sm mt-4 w-full">
        <CardHeader>
          <CardTitle className="text-xl">Register Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="Enter your name"
                  required
                  name="name"
                  value={inputValues.name || ""}
                  onChange={handleChange} // Fixed typo
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  name="email"
                  value={inputValues.email || ""}
                  onChange={handleChange} // Fixed typo
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="****"
                  type="password"
                  name="password"
                  value={inputValues.password || ""}
                  onChange={handleChange} // Fixed typo
                />
              </div>
              <Button type="submit" className="w-full bg-black text-white">
                Create an account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
