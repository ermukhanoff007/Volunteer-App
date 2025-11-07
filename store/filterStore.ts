import {create} from "zustand";
interface FilterState {
    city: string;
    setCity: (city: string) => void;
    reset: () => void;
}
export const useFilterStore = create<FilterState>((set) => ({
    city: "",
    setCity: (city: string) => set({ city }),
    reset: () => set({ city: "" }),
}));