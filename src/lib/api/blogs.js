import apiClient from ".";

export const fetchAllBlogs = async () => {
  try {
    const response = await apiClient.get("/blogs");

    return response.data;
  } catch (error) {
    throw error;
  }
};
