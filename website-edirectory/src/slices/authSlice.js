import { createSlice } from "@reduxjs/toolkit";

// Safely parse userInfo from localStorage
let userInfo = null;

try {
  const storedData = localStorage.getItem("userInfo");
  userInfo = storedData ? JSON.parse(storedData) : null;
} catch (error) {
  console.error("Failed to parse userInfo from localStorage:", error);
}

const initialState = {
  userInfo, // Assign the parsed userInfo or null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const userInfo = action.payload;
      state.userInfo = userInfo;

      // Store user info in localStorage
      if (userInfo) {
        try {
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } catch (error) {
          console.error("Failed to set userInfo in localStorage:", error);
        }
      }
    },
    logout: (state) => {
      state.userInfo = null;

      // Remove user info from localStorage
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        console.error("Failed to remove userInfo from localStorage:", error);
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
