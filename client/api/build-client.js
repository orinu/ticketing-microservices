import axios from "axios";

export default ({ req }) => {
     // on server - request made to http://ingress-nginx...
  if (typeof window === "undefined") {
    return axios.create({
        baseURL: 'http://www.uniqueautohub.store/',
        headers: req.headers
        
    })
  }
  // if (typeof window === "undefined") {
  //   return axios.create({
  //       baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
  //       headers: req.headers
  //   })
  // }
  
  // on browser, no need to change base url
  else {
    return axios.create({
        baseURL: '/',
    })
  }
}