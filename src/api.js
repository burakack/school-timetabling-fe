import axiosInstance from "./axiosInstance";

const api = {
  // Login user
  loginUser: (credentials) => axiosInstance.post("/users/signin", credentials),

  // Sign up new user
  signUpUser: (userData) => axiosInstance.post("/users/signup", userData),

  


};

export default api;