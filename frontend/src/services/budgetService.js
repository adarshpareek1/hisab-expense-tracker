import api from "./api";

export const getBudget = async (month) => {
  const res = await api.get(`/budget?month=${month}`);
  return res.data;
};

export const setBudget = async (data) => {
  const res = await api.post("/budget", data);
  return res.data;
};
