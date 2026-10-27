import { useState, type FormEvent } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Register form is ready! Backend will be connected later.");
}

return (
    <main className="register-page">
    <section className="register-intro">
        <Link to="/" className="register-logo" aria-label="Dalili home">
            <span className="register-logo-mark">D</span>
            <span>Dalili</span>
            </Link>

        <div className="register-intro-content">
        <p className="register-label">YOUR JOURNEY STARTS HERE</p>
        <h1>A new language is a new way to see the world.</h1>
        <p>Find your voice. Discover new cultures. Learn with Dalili.</p>
        </div>

        <span className="register-decoration"></span>
    </section>

    <section className="register-form-section">
        <a href="/" className="register-back">← Back to home</a>

        <div className="register-card">
        <p className="register-label">WELCOME TO DALILI</p>
        <h2>Begin your journey</h2>
        <p className="register-subtitle">
            Create your free account and start learning.
        </p>

        <div className="register-socials">
            <button type="button" className="register-social-button">
            <strong>G</strong> Google
            </button>
            
        </div>

        <div className="register-divider">
            <span>or continue with email</span>
        </div>

        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <input
            id="name"
            type="text"
            placeholder="Enter your name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            />

            <label htmlFor="email">Email address</label>
            <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            />

            <label htmlFor="password">Password</label>
            <div className="register-password">
            <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "Hide" : "Show"}
            </button>
            </div>

            <button className="register-submit" type="submit">
            Create account <span>→</span>
            </button>
        </form>

        <p className="register-login">
            Already have an account? <a href="/login">Log in</a>
        </p>
        </div>
    </section>
    </main>
);
}