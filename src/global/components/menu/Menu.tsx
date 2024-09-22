import React from "react";
import Link from "next/link";
import { Calendar, User, Settings, LogOut } from "lucide-react";
import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Calendar className={styles.logoIcon} />
          <span className={styles.logoText}>EcoCalendar</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/mon-espace" className={styles.navLink}>
                Mon espace
              </Link>
            </li>
            <li>
              <Link href="/profil" className={styles.navLink}>
                Mon profil
              </Link>
            </li>
            <li>
              <Link href="/mon-espace" className={styles.navLink}>
                Mon équipe (WIP)
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
