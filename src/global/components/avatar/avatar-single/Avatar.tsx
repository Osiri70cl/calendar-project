"use client";
import styles from "./Avatar.module.scss";
import Image from "next/image";

const Avatar: React.FC<any> = ({ src, alt }) => {
  return (
    <div className={styles.avatar}>
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
};

export default Avatar;
