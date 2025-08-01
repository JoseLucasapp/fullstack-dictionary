import { useState } from "react";
import "./style.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiCreateAccount, apiLogin } from "../../api/userRequests";

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
            console.error("Erro ao fazer login:", error);
            alert("Email ou senha inválidos.");
        }
    };

    const handleCreateAccount = async () => {
        try {
            const res = await apiCreateAccount({
                name,
                email,
                password,
            });

            console.log(res)

            login(res.data.token);
            navigate("/home");

        } catch (error: any) {
            console.error("Erro ao criar conta:", error);
            alert("Erro ao criar conta. Tente novamente.");
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
                <section className="left-section">
                    <img src="/icon.png" alt="A book with a mouse, the logo." />
                    <p>Fullstack dictionary</p>
                </section>

                <section className="right-section">
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
                                    renderFormGroup("password", "password", "Senha", password, setPassword)
                                }

                                <div className="form-group">
                                    <button onClick={handleLoginAction}>Login</button>
                                </div>

                                <div className="form-group">
                                    <p className="link" onClick={handleIsLogin}>Não tenho conta, cadastrar</p>
                                </div>
                            </div>
                        ) : (
                            <div className="section-content">
                                <div className="form-group">
                                    <p className="title">Criar conta</p>
                                </div>

                                {
                                    renderFormGroup("name", "name", "Nome", name, setName)
                                }

                                {
                                    renderFormGroup("email", "email", "Email", email, setEmail)
                                }

                                {
                                    renderFormGroup("password", "password", "Senha", password, setPassword)
                                }

                                <div className="form-group">
                                    <button onClick={handleCreateAccount}>Criar conta</button>
                                </div>

                                <div className="form-group">
                                    <p className="link" onClick={handleIsLogin}>Já tenho conta, fazer login</p>
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