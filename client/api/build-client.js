import axios from "axios";

export default ({ req }) => {
     // on server - request made to http://ingress-nginx...
  if (typeof window === "undefined") {
    return axios.create({
        baseURL: 'www.uniqueautohub.store',
        headers: req.headers
    })
  }
  // on browser, no need to change base url
  else {
    return axios.create({
        baseURL: '/',
    })
  }
}