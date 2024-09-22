import { create } from "zustand";

interface ModalState {
  status: boolean;
  children: React.ReactNode | null;
  className: string;
  position: "center" | string;
  title: string;
  mW: number | string;
  hideclose: boolean;
  outsideClick: boolean;
  setHandleStatusModal: (params: Partial<ModalState>) => void;
  resetHandleStatusModal: () => void;
}

const initialState = {
  status: false,
  children: null,
  className: "",
  position: "center",
  title: "",
  mW: 520,
  hideclose: false,
  outsideClick: false,
};

export const useModalStore = create<ModalState>()((set) => ({
  ...initialState,
  setHandleStatusModal: (params) => set((state) => ({ ...state, ...params })),
  resetHandleStatusModal: () => set(initialState),
}));
