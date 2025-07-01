import axiosClient from "./axiosClient";

const getProducts = async (query) => {
  const { sortType, page, limit } = query;
  const queryLimit = limit === "all" ? "" : `&limit=${limit}`;
  try {
    const response = await axiosClient.get(
      `/product?sortType=${sortType}&page=${page}&${queryLimit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export { getProducts };
