import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

export async function getMovies() {
  return await http.get(apiEndpoint);
}

export async function getMovie(movieId) {
  return await http.get(apiEndpoint + "/" + movieId);
}

export async function deleteMovie(movieId) {
  return await http.delete(apiEndpoint + "/" + movieId);
}
export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(apiEndpoint + "/" + movie._id, body);
  }
  return await http.post(apiEndpoint, movie);
}
