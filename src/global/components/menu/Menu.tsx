"use client";

import { MENU_CALENDAR_VIEW } from "@/global/constants/MenuCalendarView";
import { MENU_CONSTANT } from "@/global/constants/MenuConstant";
import { MENU_PROFIL_VIEW } from "@/global/constants/MenuProfilView";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "./Menu.module.scss";

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirectToPath = (path: string) => {
    router.push(path);
  };

  const renderCorrectSubmenu = useMemo(() => {
    if (pathname.includes("/profil")) {
      return MENU_PROFIL_VIEW.map((item) => (
        <div key={item.id} className={styles.item}>
          <div
            className={styles.iconSubmenu}
            onClick={() => handleRedirectToPath(item.path)}
          >
            {item.icon}
          </div>
          <div className={styles.tooltip}>
            <span>{item.title}</span>
          </div>
        </div>
      ));
    } else if (pathname.includes("/calendrier")) {
      return MENU_CALENDAR_VIEW.map((item) => (
        <div key={item.id} className={styles.item}>
          <div
            className={styles.iconSubmenu}
            onClick={() => handleRedirectToPath(item.path)}
          >
            {item.icon}
          </div>
          <div className={styles.tooltip}>
            <span>{item.title}</span>
          </div>
        </div>
      ));
    }

    return null;
  }, [pathname, handleRedirectToPath]);

  const shouldShowSubmenu = (itemPath: string) => {
    return (
      (pathname.includes("/profil") && itemPath.includes("/profil")) ||
      (pathname.includes("/calendrier") && itemPath.includes("/calendrier"))
    );
  };

  const renderMenu = useMemo(() => {
    return MENU_CONSTANT.map((item) => (
      <div key={item.id} className={styles.item}>
        <div
          className={styles.icon}
          onClick={() => handleRedirectToPath(item.path)}
        >
          {item.icon}
        </div>
        <div className={styles.tooltip}>
          <span>{item.title}</span>
        </div>
        {shouldShowSubmenu(item.path) && (
          <div className={styles.submenu}>{renderCorrectSubmenu}</div>
        )}
      </div>
    ));
  }, [renderCorrectSubmenu, shouldShowSubmenu, handleRedirectToPath]);

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Image src="/images/logoTemp.png" alt="Logo" width={100} height={40} />
      </div>
      <div className={styles.menu}>{renderMenu}</div>
    </div>
  );
};

export default Menu;
