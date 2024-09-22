"use client";
import Avatar from "../avatar-single/Avatar";
import styles from "./AvatarGroup.module.scss";

const AvatarGroup = ({ avatars, maxAvatars = 3 }: any) => {
  const visibleAvatars = avatars.slice(0, maxAvatars);
  const remainingAvatars = avatars.length - maxAvatars;

  return (
    <div className={styles.avatarGroup}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className={styles.avatarWrapper}>
          <Avatar {...avatar} />
        </div>
      ))}
      {remainingAvatars > 0 && (
        <div className={styles.remainingAvatars}>+{remainingAvatars}</div>
      )}
    </div>
  );
};

export default AvatarGroup;
