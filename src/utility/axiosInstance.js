import axios from "axios"
import React, {useContext} from "react"

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "http://13.211.76.250:3000/api", old ip
  // baseURL: "http://54.206.254.1:3000/api",
  // baseURL: "http://13.211.130.35:3000",
  timeout: 1000
  // headers: {'jwt': tokens.jwt}
})
// if (document.cookie.includes("u_email")) {
//   const cookies =document.cookie.split("; ")
//
//   const jwt = cookies.filter((e) => e.includes("jwt"))[0]
//       .split("=")[1]
//
//   instance.defaults.headers.common['Authorization'] = jwt
// }

export default instance
