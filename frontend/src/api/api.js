import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });

export const fetchPosts = () => API.get("/api/posts");
export const createPost = (newPost) => API.post("/api/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`${"/api/posts"}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${"/api/posts"}/${id}`);
export const likePost = (id) => API.patch(`${"/api/posts"}/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
