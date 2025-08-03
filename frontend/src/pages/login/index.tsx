import { useState } from "react";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiCreateAccount, apiLogin } from "../../api/userRequests";
import Swal from "sweetalert2";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleIsLogin = () => {
        setIsLogin(!isLogin);

        setName("");
        setEmail("");
        setPassword("");
    }

    const handleLoginAction = async () => {
        try {
            const res = await apiLogin({ email, password });
            login(res.token);
            navigate("/home");

        } catch (error) {
            console.error("Error trying to login:", error);
            Swal.fire("Error!", "Email or password incorrect", "error");
        }
    };

    const handleCreateAccount = async () => {
        try {
            const res = await apiCreateAccount({
                name,
                email,
                password,
            });

            login(res.data.token);
            navigate("/home");

        } catch (error: any) {
            console.error("Error trying to create an account:", error);
            Swal.fire("Error!", "Error trying to create acount", "error");
        }
    };

    const renderFormGroup = (type: string, name: string, label: string, value: string, action: (value: string) => void) => {
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type={type} name={name} id={name} value={value} onChange={(e) => action(e.target.value)} />
            </div>
        )
    }

    return (
        <section className="login-page">
            <section className="login-component">
                <section className="left-section-login">
                    <img src="/icon.png" alt="A book with a mouse, the logo." />
                    <p>Fullstack dictionary</p>
                </section>

                <section className="right-section-login">
                    {
                        isLogin ? (
                            <div className="section-content">
                                <div className="form-group">
                                    <p className="title">Login</p>
                                </div>

                                {
                                    renderFormGroup("email", "email", "Email", email, setEmail)
                                }

                                {
                                    renderFormGroup("password", "password", "Password", password, setPassword)
                                }

                                <div className="form-group">
                                    <button onClick={handleLoginAction}>Login</button>
                                </div>

                                <div className="form-group">
                                    <p className="link" onClick={handleIsLogin}>Create account</p>
                                </div>
                            </div>
                        ) : (
                            <div className="section-content">
                                <div className="form-group">
                                    <p className="title">Create Account</p>
                                </div>

                                {
                                    renderFormGroup("name", "name", "Name", name, setName)
                                }

                                {
                                    renderFormGroup("email", "email", "Email", email, setEmail)
                                }

                                {
                                    renderFormGroup("password", "password", "Password", password, setPassword)
                                }

                                <div className="form-group">
                                    <button onClick={handleCreateAccount}>Create Account</button>
                                </div>

                                <div className="form-group">
                                    <p className="link" onClick={handleIsLogin}>Login</p>
                                </div>
                            </div>
                        )
                    }


                </section>
            </section>
        </section>
    )
}

export default LoginPage