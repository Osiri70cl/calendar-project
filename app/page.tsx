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
              <Link href="/connexion" className={styles.navLink}>
                Connexion
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <h1>Devenez maitre de votre temps</h1>
          <p>
            Un calendrier complet pour tous vos événements, de la réunion à la
            prise de rendez-vous en passant par les annonces pour votre ville.
          </p>
          <Link href={"/inscription"} className={styles.ctaButton}>
            Je m'inscris <ArrowRight size={20} />
          </Link>
        </section>
        <section id="features" className={styles.features}>
          <h2>Fonctionnalités</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <Users className={styles.featureIcon} />
              <h3>Collaboration</h3>
              <p>
                Creez facilement votre calendrier d'équipe et partagez-les avec
                vos collaborateurs.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Building2 className={styles.featureIcon} />
              <h3>Événements publics</h3>
              <p>
                Partagez facilement vos événements et permettez aux utilisateurs
                de s'y inscrire.
              </p>
            </div>
            <div className={styles.featureCard}>
              <Stethoscope className={styles.featureIcon} />
              <h3>Prise de rendez-vous</h3>
              <p>
                Une prise de rendez-vous facile et rapide pour vos patients avec
                une indication des disponibilités.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
