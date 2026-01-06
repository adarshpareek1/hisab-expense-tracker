import api from "./api";

export const fetchExpenses = async (month) => {
  const res = await api.get(`/expenses?month=${month}`);
  return res.data;
};

export const addExpense = async (data) => {
  const res = await api.post("/expenses", data);
  return res.data;
};

export const updateExpense = async (id, data) => {
  const res = await api.put(`/expenses/${id}`, data);
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};
