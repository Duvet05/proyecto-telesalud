import axios from "axios";
import connection from "../configs/connection";

const axiosInstance = axios.create({
  baseURL: connection.backend,
});
