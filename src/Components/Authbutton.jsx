import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/feature/authSlice";

const AuthButton = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Handle Login
    const handleLogin = () => {
        if (username.trim() === "") {
            alert("Please enter your name.");
            return;
        }

        if (password.trim() === "") {  
            alert("Please enter your password.");
            return;
        }

        dispatch(login(username)); // ✅ Only store username in Redux
        setUsername("");  
        setPassword("");
    };

    return (
        <div>
            {isAuthenticated ? (
                <div className="flex justify-center items-center gap-4">
                    <span className="sm:text-lg md:text-xl font-semibold">Welcome, {user} 👋</span>
                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-yellow-700 text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-screen gap-4">
                    <h1 className="text-4xl font-bold">Login Page</h1>
                    <div className="  items-center">
                        <div className="text-1xl font-semibold mb-2">Name </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your name"
                            className="border p-2 rounded-md"
                        />
                    </div>
                    <div className=" items-center">
                        <div className="text-1xl font-semibold mb-2">Password </div>
                        <input  type="password"
                    value={password} onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    onChange={(e) => setPassword(e.target.value)}   placeholder="Enter your Password" className="border p-2 rounded-md" />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuthButton;
