// This is essentially a custom hook we created that can be accessible anywhere in the project
import create from "zustand";

// State remains the same even after reload
import { persist } from "zustand/middleware";
import axios from "axios";

const authStore = (set: any) => ({
  userProfile: null,
  addUser: (user: any) => set({ userProfile: user }),
  // Set userProfile to null when removeUser function is called
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
