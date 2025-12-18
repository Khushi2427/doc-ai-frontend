import { create } from "zustand";
import API from "../api/axios1";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return { success: true };
    } catch (err) {
      set({ loading: false });
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  },

  register: async (name, email, password, role) => {
    set({ loading: true });

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return { success: true };
    } catch (err) {
      set({ loading: false });
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  },

  fetchUser: async () => {
    try {
      const res = await API.get("/auth/me");
      set({ user: res.data.user });
    } catch (err) {
      console.log("Not logged in");
    }
  },

  logout: async () => {
    try {
      await API.post("/auth/logout");
    } catch {}

    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
