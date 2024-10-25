import axios from "axios"

const baseURL =
  typeof window !== "undefined"
    ? window.location.origin // Executa no cliente
    : "http://localhost:3000"

console.log(baseURL)
export const api = axios.create({
  baseURL,
  withCredentials: true,
})
