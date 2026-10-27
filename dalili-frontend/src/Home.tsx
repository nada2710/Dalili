import { type ReactNode } from 'react'

const languages = [
    ['Spanish', 'Español', 'ES'],
    ['French', 'Français', 'FR'],
    ['English', 'English', 'EN'],
    ['Arabic', 'العربية', 'AR'],
    ['Japanese', '日本語', 'JP'],
    ['German', 'Deutsch', 'DE'],
    ]

    function Icon({ name, size = 20 }: { name: string; size?: number }) {
    const paths: Record<string, ReactNode> = {
        arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
        spark: (
        <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
        ),
        play: <path d="m9 7 8 5-8 5V7Z" />,
        book: (
        <>
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
            <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
        </>
        ),
        clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
        ),
        flame: (
        <path d="M13.5 3.5c.5 4-3 5-3 8 0 1.2.6 2 1.5 2.5-.2-2 1-3.1 2-4.2.2 2.4 2.5 3.3 2.5 6.2a4.5 4.5 0 0 1-9 0c0-4.3 3.1-7.3 6-12.5Z" />
        ),
        globe: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </>
        ),
        user: (
        <>
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6" />
        </>
        ),
    }

    return (
        <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        >
        {paths[name]}
        </svg>
    )
    }

    function Logo() {
    return (
        <div className="logo">
        <span className="logo-mark">
            <b>D</b>
            <i />
        </span>
        <span>Dalili</span>
        </div>
    )
    }

    interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    className?: string
    }

    function Button({ children, onClick, className = '' }: ButtonProps) {
    return (
        <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick?.()
            }
        }}
        className={`button ${className}`}
        >
        {children}
        </div>
    )
    }

    function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    })
    }
    
    import { Link } from 'react-router-dom'

    function Header() {
    return (
        <header className="header">
        <Logo />

        <nav aria-label="Primary navigation">
            <span onClick={() => scrollToSection('how-it-works')}>
            How it works
            </span>
            <span onClick={() => scrollToSection('languages')}>
            Languages
            </span>
            <span onClick={() => scrollToSection('approach')}>
            Our approach
            </span>
        </nav>

        <div className="header-actions">
            <Link to="/login" className="login-link">
            Log in
            </Link>

            <Link to="/register" className="button">
            Start learning
            <Icon name="arrow" size={18} />
            </Link>
        </div>
        </header>
    )
}


    export default function App() {
    return (
        <div className="page">
        <Header />

        <main>
            <section className="hero">
            <div className="hero-copy">
                <div className="eyebrow">
                <Icon name="spark" size={16} />
                Your language journey, made personal
                </div>

                <h1>
                Learn a language.
                <br />
                <em>Find your way.</em>
                </h1>

                <p>
                Free, personalized lessons that adapt to your goals, your pace,
                and the way you learn best.
                </p>

                <div className="hero-actions">
                <Link to="/register" className="button">
                    Start learning for free
                    <Icon name="arrow" />
                    </Link>
                <span>No credit card · Always free</span>
                </div>

                <div className="social-proof">
                <div className="avatars">
                    <i>AM</i>
                    <i>JS</i>
                    <i>LK</i>
                    <i>+</i>
                </div>
                <span>Designed for learners around the world</span>
                </div>
            </div>

            <div className="hero-art" aria-label="Personal learning plan preview">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />

                <div className="speech speech-one">
                Hola!
                <span>¡Mucho gusto!</span>
                </div>

                <div className="speech speech-two">
                Bonjour
                <span>Comment ça va?</span>
                </div>

                <div className="guide-card">
                <div className="guide-icon">
                    <Icon name="globe" size={34} />
                </div>

                <small>YOUR GUIDE</small>
                <strong>Spanish · A2</strong>

                <div className="mini-progress">
                    <i />
                </div>

                <p>Next: Ordering at a café</p>

                <div className="play">
                    <Icon name="play" />
                </div>
                </div>

                <div className="streak-pop">
                <Icon name="flame" />
                <span>
                    <b>12 day</b>
                    <small>streak</small>
                </span>
                </div>
            </div>
            </section>

            <section className="trust">
            <span>Explore languages from around the world</span>

            <div>
                <b>ES</b>
                <b>FR</b>
                <b>JP</b>
                <b>DE</b>
                <b>AR</b>
                <b>IT</b>
                <span>More languages coming soon</span>
            </div>
            </section>

            <section className="how" id="how-it-works">
            <div className="section-head">
                <span>HOW DALILI WORKS</span>
                <h2>A clear path, built around you</h2>
                <p>
                No guessing what to learn next. Dalili guides every step of your
                journey.
                </p>
            </div>

            <div className="feature-grid">
                <article>
                <i>01</i>
                <div className="feature-icon">
                    <Icon name="user" />
                </div>
                <h3>Tell us about you</h3>
                <p>
                    Choose your language, current level, goals, and weekly schedule.
                </p>
                </article>

                <article>
                <i>02</i>
                <div className="feature-icon">
                    <Icon name="spark" />
                </div>
                <h3>Get your personal plan</h3>
                <p>
                    A flexible learning path designed to fit your life and
                    ambitions.
                </p>
                </article>

                <article>
                <i>03</i>
                <div className="feature-icon">
                    <Icon name="book" />
                </div>
                <h3>Learn, practice, grow</h3>
                <p>
                    Build real skills with daily lessons, speaking practice, and
                    feedback.
                </p>
                </article>
            </div>
            </section>

            <section className="approach-section" id="approach">
            <div className="approach-copy">
                <span className="section-kicker">OUR APPROACH</span>

                <h2>Learning that moves at your pace</h2>

                <p>
                Dalili shapes each lesson around what matters to you. Your level
                sets the starting point; your goals, interests, and weekly rhythm
                shape the journey ahead.
                </p>

                <div className="approach-points">
                <div>
                    <i>
                    <Icon name="spark" />
                    </i>
                    <span>
                    <b>Made for your goals</b>
                    <small>
                        Travel, career, study, or meaningful everyday conversations.
                    </small>
                    </span>
                </div>

                <div>
                    <i>
                    <Icon name="clock" />
                    </i>
                    <span>
                    <b>Flexible by design</b>
                    <small>
                        Short daily sessions adapt to your schedule and progress.
                    </small>
                    </span>
                </div>

                <div>
                    <i>
                    <Icon name="globe" />
                    </i>
                    <span>
                    <b>Useful in the real world</b>
                    <small>
                        Practice language you can use with confidence from day one.
                    </small>
                    </span>
                </div>
                </div>
            </div>

            <div className="approach-visual">
                <div className="interest-card">
                <small>YOUR LEARNING MIX</small>
                <h3>Built around Samira</h3>

                <div>
                    <span>Conversation</span>
                    <b>40%</b>
                </div>
                <i>
                    <u style={{ width: '40%' }} />
                </i>

                <div>
                    <span>Listening</span>
                    <b>30%</b>
                </div>
                <i>
                    <u style={{ width: '30%' }} />
                </i>

                <div>
                    <span>Vocabulary</span>
                    <b>20%</b>
                </div>
                <i>
                    <u style={{ width: '20%' }} />
                </i>

                <div>
                    <span>Culture</span>
                    <b>10%</b>
                </div>
                <i>
                    <u style={{ width: '10%' }} />
                </i>

                <p>
                    <Icon name="spark" size={15} />
                    Updated as you learn
                </p>
                </div>

                <div className="pace-note">
                <Icon name="clock" />
                <span>
                    <b>20 min / day</b>
                    <small>Your ideal pace</small>
                </span>
                </div>
            </div>
            </section>

            <section className="languages-section" id="languages">
            <div className="section-head">
                <span>EXPLORE LANGUAGES</span>
                <h2>Choose where your journey begins</h2>
                <p>
                Start with one language today. Add another whenever you’re ready.
                </p>
            </div>

            <div className="home-language-grid">
                {languages.map(([name, native, code]) => (
                <div className="home-language-card" key={name}>
                    <span>{code}</span>
                    <div>
                    <b>{name}</b>
                    <small>{native}</small>
                    </div>
                    <i>
                    <Icon name="arrow" size={17} />
                    </i>
                </div>
                ))}

                <div className="home-language-card more">
                <span>+</span>
                <div>
                    <b>More languages</b>
                    <small>Discover the full collection</small>
                </div>
                <i>
                    <Icon name="arrow" size={17} />
                </i>
                </div>
            </div>
            </section>

            <section className="experience-section">
            <div className="section-head">
                <span>YOUR PERSONAL EXPERIENCE</span>
                <h2>Everything you need to keep moving</h2>
                <p>A calm, focused home for your daily learning journey.</p>
            </div>

            <div className="experience-preview">
                <div className="preview-main">
                <div className="preview-greeting">
                    <span>
                    <small>TODAY’S FOCUS</small>
                    <h3>At the café</h3>
                    <p>Build confidence ordering food and drinks.</p>
                    </span>

                    <div className="preview-cup" aria-hidden="true">
                    ☕
                    </div>
                </div>

                <div className="preview-progress">
                    <span>
                    <b>Today’s progress</b>
                    <small>2 of 4 activities</small>
                    </span>

                    <div className="mini-progress">
                    <i />
                    </div>
                </div>

                <Button onClick={() => scrollToSection('languages')}>
                    Explore languages
                    <Icon name="arrow" />
                </Button>
                </div>

                <div className="preview-side">
                <div className="preview-stat">
                    <Icon name="flame" />
                    <span>
                    <b>12-day streak</b>
                    <small>Keep your momentum going</small>
                    </span>
                </div>

                <div className="preview-week">
                    <span>
                    <b>This week</b>
                    <small>3 of 5 days</small>
                    </span>

                    <div>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                        <i
                        className={index < 3 ? 'done' : ''}
                        key={`${day}-${index}`}
                        >
                        {index < 3 ? '✓' : day}
                        </i>
                    ))}
                    </div>
                </div>

                <div className="preview-level">
                    <div>A2</div>
                    <span>
                    <small>CURRENT LEVEL</small>
                    <b>Elementary</b>
                    <em>64% to your next milestone</em>
                    </span>
                </div>
                </div>
            </div>
            </section>

            <section className="testimonials-section">
            <div className="section-head">
                <span>LEARNER STORIES</span>
                <h2>Built for real learning moments</h2>
                <p>
                Sample testimonials showing the kinds of experiences Dalili is
                designed to support.
                </p>
            </div>

            <div className="testimonial-grid">
                <article>
                <span>SAMPLE TESTIMONIAL</span>
                <p>
                    “The daily plan makes it easy to know exactly what to practice.
                    I can fit a complete lesson into my commute.”
                </p>
                <div>
                    <i>MA</i>
                    <b>
                    Maya A.
                    <small>Learning Spanish for travel</small>
                    </b>
                </div>
                </article>

                <article>
                <span>SAMPLE TESTIMONIAL</span>
                <p>
                    “I like that lessons feel connected to my goals. The speaking
                    prompts make everyday conversations feel less intimidating.”
                </p>
                <div>
                    <i>JL</i>
                    <b>
                    Jon L.
                    <small>Learning French for work</small>
                    </b>
                </div>
                </article>

                <article>
                <span>SAMPLE TESTIMONIAL</span>
                <p>
                    “The progress view is motivating without being distracting. It
                    helps me focus on consistency instead of perfection.”
                </p>
                <div>
                    <i>RN</i>
                    <b>
                    Rina N.
                    <small>Learning Japanese for culture</small>
                    </b>
                </div>
                </article>
            </div>
            </section>

            <section className="final-cta">
            <div>
                <span className="section-kicker">
                YOUR NEXT LANGUAGE STARTS HERE
                </span>

                <h2>
                A little progress every day
                <br />
                can take you anywhere.
                </h2>

                <p>
                Get a learning plan shaped around your life, goals, and pace.
                </p>

                <Button onClick={() => scrollToSection('languages')}>
                Start exploring languages
                <Icon name="arrow" />
                </Button>

                <small>Free to start · Learn at your own pace</small>
            </div>

            <div className="cta-orbit">
                <span>Hola</span>
                <span>Bonjour</span>
                <span>مرحباً</span>
                <span>Ciao</span>
                <div>
                <Logo />
                </div>
            </div>
            </section>
        </main>

        <footer className="home-footer">
            <div className="footer-main">
            <div className="footer-brand">
                <Logo />
                <p>
                Your personal guide to learning languages with clarity and
                confidence.
                </p>
            </div>

            <div>
                <b>Learn</b>
                <span onClick={() => scrollToSection('languages')}>Languages</span>
                <span onClick={() => scrollToSection('how-it-works')}>
                How it works
                </span>
                <span onClick={() => scrollToSection('approach')}>
                Learning approach
                </span>
            </div>

            <div>
                <b>Dalili</b>
                <span>About</span>
                <span>Accessibility</span>
                <span>Help center</span>
            </div>

            <div>
                <b>Legal</b>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Cookies</span>
            </div>
            </div>

            <div className="footer-bottom">
            <span>© 2025 Dalili. Designed to guide every learner.</span>
            <span>English · Global</span>
            </div>
        </footer>
        </div>
    )
}