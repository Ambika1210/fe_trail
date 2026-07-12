import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../services/coreService";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUserApi({
                email,
                password,
            });

            console.log(response.data);

            // Save Token
            localStorage.setItem(
                "token",
                response.data.data.token
            );

            alert("Login Successful");

            // Redirect
            navigate("/my-user");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f4f4",
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    width: "350px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    Login
                </h2>

                <div style={{ marginBottom: "15px" }}>
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;