import Menu from "@/global/components/menu/Menu";

import styles from "./layout.module.scss";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <Menu />
      </div>
      {children}
    </div>
  );
}
