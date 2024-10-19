import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

export default function Login() {
    const [inputValues, setInputValues] = useState({});
    const handleChange = (e) => { // Fixed typo
        const name = e.target.name;
        const value = e.target.value;
        setInputValues((values) => ({ ...values, [name]: value }));
      };
    
      const handleSubmit = (e) => { // Fixed typo
        e.preventDefault();
        console.log(inputValues);
        axios.post("http://localhost:8000/api/v1/users/login"
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
      <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email"
           placeholder="m@example.com"
            required
            name="email"
            value={inputValues.email || ""}
            onChange={handleChange} 
             />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password"
           type="password"
            required
            name="password"
            value={inputValues.password || ""}
            onChange={handleChange}
             />
        </div>
      </CardContent>
    
      <CardFooter>
        <Button className="w-full bg-black text-white">Sign in</Button>
      </CardFooter>
      </form>
      <div className="mb-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
    </Card>
  </div>
  )
}
