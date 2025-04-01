"use client";

import { useEffect, useRef } from "react";

interface WindowSize {
  width: number | null;
  height: number | null;
}

export default function useOutsideClick(onOutsideClick: any) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        onOutsideClick();
      }
    }

    function handleKeyDown(event: any) {
      if (event.key === "Escape") {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, onOutsideClick]);

  return ref;
}
