import apiClient from ".";

export const loginApi = async ({ username, password }) => {
  try {
    const response = await apiClient.post("/auth/login/", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async ({ username, password, email }) => {
  try {
    const response = await apiClient.post("/auth/signup/", {
      username,
      password,
      email,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
