"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Modal.module.scss";
import { useModalStore } from "@/zustand/store";
import { X } from "lucide-react";

const Modal = () => {
  const router = useRouter();
  const {
    status,
    children,
    className,
    title,
    hideclose,
    outsideClick,
    setHandleStatusModal,
  } = useModalStore();

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setHandleStatusModal({ status: false });
    };
    router?.events?.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router?.events?.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router, setHandleStatusModal]);

  if (!status) {
    return null;
  }

  const classNameBox = className
    ? styles.box + " " + styles[className]
    : styles.box;

  function handleClose() {
    setHandleStatusModal({ status: false });
  }

  return (
    <div className={styles.main}>
      <div className={classNameBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.boxHeader}>
          {title && <p className={styles.title}>{title}</p>}
          {!hideclose && (
            <button
              aria-label="Close Modal"
              type="button"
              onClick={handleClose}
              className="m-button m-button--round m-button--secondary"
            >
              <span>
                <X />
              </span>
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
