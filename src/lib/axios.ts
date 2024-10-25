import axios from "axios"

import { env } from "@/utils/env"

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? env.API_URL
      : "http://localhost:3000",
  withCredentials: true,
})
