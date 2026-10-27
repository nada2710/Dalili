
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        alert('Login form is ready! Backend will be connected later.')
    }

    function handleGoogleLogin() {
        alert('Google login will be connected later.')
    }

    return (
        <main className="login-page">
        <section className="login-intro">
            <Link to="/" className="login-logo" aria-label="Dalili home">
            <span className="login-logo-mark">D</span>
            <span>Dalili</span>
            </Link>

            <div className="login-intro-content">
            <span className="login-quote-mark">“</span>
            <h1>A new language is a new way to see the world.</h1>
            <p>
                Join millions of curious learners finding their way with Dalili.
            </p>
            </div>

            <div className="login-decoration" aria-hidden="true">
            <span></span>
            <span></span>

            
            </div>
        </section>

        <section className="login-form-section">
            <div className="login-form-container">
            <Link to="/" className="login-back">
                ← Back to home
            </Link>

            <div className="login-card">
                <h2>Welcome back</h2>
                <p className="login-subtitle">
                Continue your learning journey.
                </p>

                <button
                type="button"
                className="login-google-button"
                onClick={handleGoogleLogin}
                >
                <strong>G</strong>
                Continue with Google
                </button>

                <div className="login-divider">
                <span>or continue with email</span>
                </div>

                <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">Email address</label>
                <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <div className="login-password-options">
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? 'Hide password' : 'Show password'}
                    </button>

                    <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <button type="submit" className="login-submit">
                    Log in <span>→</span>
                </button>
                </form>

                <p className="login-register">
                New to Dalili? <Link to="/register">Create an account</Link>
                </p>
            </div>
            </div>
        </section>
        </main>
    )
}
