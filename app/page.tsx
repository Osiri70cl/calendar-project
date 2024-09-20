import {
  Calendar,
  Users,
  Building2,
  Stethoscope,
  HardHat,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Calendar className={styles.logoIcon} />
            <span>EcoCalendar</span>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <Link href="/connexion" className={styles.navLink}>
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <h1>Streamline Your Scheduling</h1>
          <p>
            The professional calendar solution for city councils, medical
            practices, construction teams, and more.
          </p>
          <button className={styles.ctaButton}>
            Get Started <ArrowRight size={20} />
          </button>
        </section>

        <section id="features" className={styles.features}>
          <h2>Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Users className={styles.featureIcon} />
              <h3>Team Collaboration</h3>
              <p>
                Easily coordinate schedules and share calendars with your team
                members.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Building2 className={styles.featureIcon} />
              <h3>Resource Management</h3>
              <p>
                Efficiently manage meeting rooms, equipment, and other
                resources.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Stethoscope className={styles.featureIcon} />
              <h3>Appointment Booking</h3>
              <p>
                Streamline patient appointments and reduce scheduling conflicts.
              </p>
            </div>
            <div className={styles.featureCard}>
              <HardHat className={styles.featureIcon} />
              <h3>Project Timeline</h3>
              <p>
                Visualize project timelines and track progress effortlessly.
              </p>
            </div>
          </div>
        </section>

        <section id="testimonials" className={styles.testimonials}>
          <h2>What Our Users Say</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <p>
                "EcoCalendar has revolutionized how we manage city council
                meetings and public events."
              </p>
              <cite>- Sarah Johnson, City Clerk</cite>
            </div>
            <div className={styles.testimonialCard}>
              <p>
                "As a busy medical practice, EcoCalendar helps us optimize our
                patient scheduling and reduce wait times."
              </p>
              <cite>- Dr. Michael Chen, Family Physician</cite>
            </div>
            <div className={styles.testimonialCard}>
              <p>
                "Coordinating multiple construction projects has never been
                easier. EcoCalendar is a game-changer for us."
              </p>
              <cite>- Robert Torres, Project Manager</cite>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to Optimize Your Schedule?</h2>
          <p>
            Join thousands of professionals who trust EcoCalendar for their
            scheduling needs.
          </p>
          <button className={styles.ctaButton}>
            Start Your Free Trial <ArrowRight size={20} />
          </button>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Calendar className={styles.logoIcon} />
            <span>EcoCalendar</span>
          </div>
          <p>&copy; 2023 EcoCalendar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
