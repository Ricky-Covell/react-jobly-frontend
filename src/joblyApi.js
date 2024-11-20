import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./useLocalStorage.js";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";    
const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3001";         // changed for vite app

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${useLocalStorage('get', 'token')}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  /** Get list of all companies and jobs. */

  static async getAll() {
    let cRes = await this.request('companies')
    let jRes = await this.request('jobs')
    const responses = {
      companies: cRes.companies,
      jobs: jRes.jobs,
    }
    return responses
  }

  /** Get list of all companies. */

  static async getAllCompanies() {
    let res = await this.request('companies')
    return res.companies
  }

  /** Get list of companies matching query string. */

  static async searchCompanies(searchTerm) {
    let res = await this.request('companies', {nameLike: searchTerm})
    return res.companies
  }

  static async getCompanyJobs(handle) {
    let res = await this.request('jobs', {nameLike: searchTerm})
    return res.companies
  }

  /** Get list of all jobs. */

  static async getAllJobs() {
    let res = await this.request('jobs')
    return res.jobs
  }

  /** Get list of jobs that partially match searchterm. */

  static async searchJobs({searchTerm}) {
    let res = await this.request('jobs', {title: searchTerm})
    return res.jobs
  }

  /** user: { username, password } --> returns JWT token. */

  static async login(user) {
    const { username, password } = user
    let token = await this.request('auth/token', { username, password }, 'post')
    return token
  }

  /** Sign up new user, returns JWT token. */

  static async signup(newUser) {
    let token = await this.request('auth/register', newUser, 'post')
    return token
  }

  /** Decode JWT token --> returns user: { username, isAdmin }. */

  static async decodeToken(token) {
    const user = jwtDecode(token)
    // this.JoblyApi=(token)
    return user
  }

  /** Gets user account details. */

  static async getUserInfo(username) {
    const userInfo = this.request(`users/${username}`,)
    return userInfo
  }

    /** Patches user account details. */

    static async patchUserInfo(user) {
      const uRes = this.request(`users/${user.username}`, user, 'patch')
      return uRes
    }

    /** Applies user to job */

    static async applyToJob(username, jobId) {
      const res = this.request(`users/${username}/jobs/${jobId}`, {}, 'post')
      return res
    }
}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi