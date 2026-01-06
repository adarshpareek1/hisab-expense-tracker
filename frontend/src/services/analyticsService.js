import api from "./api";

export const getAnalytics = async (month) => {
  const res = await api.get(`/analytics?month=${month}`);
  return res.data;
};
