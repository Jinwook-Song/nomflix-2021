import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "e9658b7e9fde9f5a87597714d40bf19c",
    language: "en-US",
  },
});

api.get("tv/popular");

export default api;
