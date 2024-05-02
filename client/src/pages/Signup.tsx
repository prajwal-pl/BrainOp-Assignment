import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err: any) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg: any) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/signup",

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="w-full h-screen items-center flex flex-col justify-center">
      <h2 className="text-3xl font-semibold my-2">Signup Account</h2>
      <form className="flex my-2 flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="border border-zinc-700 p-2 rounded-lg"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="email">
            Username
          </label>
          <input
            className="border border-zinc-700 p-2 rounded-lg"
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="border border-zinc-700 p-2 rounded-lg"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button
          className="border border-zinc-900 bg-zinc-900 text-white p-2 rounded-full hover:bg-white font-semibold hover:text-zinc-900"
          type="submit"
        >
          Submit
        </button>
        <span>
          Already have an account?{" "}
          <Link className="text-blue-800 font-semibold" to={"/login"}>
            Login
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
