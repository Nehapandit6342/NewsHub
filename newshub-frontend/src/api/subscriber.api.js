import api from "./axios";

export const subscribeUser = async (email) => {
  const response = await api.post("/subscribers", {
    email,
  });

  return response.data;
};
