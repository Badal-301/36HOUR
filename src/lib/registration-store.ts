import { create } from "zustand";

/**
 * Global UI state for the registration dialog.
 * Any CTA can open the wizard; track cards can preselect a track.
 */
interface RegistrationUiState {
  isOpen: boolean;
  /** Track to preselect in the form when opened from a track card. */
  presetTrackId: string | null;
  /** Monotonic key so the wizard remounts fresh on each open. */
  openId: number;
  open: (trackId?: string) => void;
  close: () => void;
}

export const useRegistrationStore = create<RegistrationUiState>((set) => ({
  isOpen: false,
  presetTrackId: null,
  openId: 0,
  open: (trackId) =>
    set((s) => ({
      isOpen: true,
      presetTrackId: trackId ?? null,
      openId: s.openId + 1,
    })),
  close: () => set({ isOpen: false }),
}));
