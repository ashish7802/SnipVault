import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const getSnippets = async (search = "") => {
  const response = await api.get("/snippets", {
    params: search ? { search } : {},
  });
  return response.data;
};

export const createSnippet = async (data) => {
  const response = await api.post("/snippets", data);
  return response.data;
};

export const deleteSnippet = async (id) => {
  await api.delete(`/snippets/${id}`);
};
