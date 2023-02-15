// This is essentially a custom hook we created that can be accessible anywhere in the project
import { create } from "zustand";

// State remains the same even after reload
import { persist } from "zustand/middleware";
import axios from "axios";

import { BASE_URL } from "@/utils";

const authStore = (set: any) => ({
  // User profile is originally set to null
  userProfile: null,
  // All users at first is set to an empty result and populated below
  allUsers: [],
  addUser: (user: any) => set({ userProfile: user }),
  // Set userProfile to null when removeUser function is called
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const res = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: res.data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
