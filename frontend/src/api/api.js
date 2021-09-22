import axios from "axios";

const API = axios.create({ baseURL: "https://memories-dancy.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/api/posts/${id}`);
export const fetchPosts = (page) => API.get(`/api/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/api/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/api/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`${"/api/posts"}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${"/api/posts"}/${id}`);
export const likePost = (id) => API.patch(`${"/api/posts"}/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
