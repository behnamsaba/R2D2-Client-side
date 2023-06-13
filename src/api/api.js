import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

class InvolveApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  static async getCompetitors(data) {
    let res = await this.request(`api/market-research`, data, "post");
    return res;
  }
  static async getPersonalizeEmail(data) {
    let res = await this.request("api/personalize-email", data, "post");
    return res.data;
  }
  static async getCRM(data) {
    let res = await this.request("api/crm", data, "post");
    return res.data;
  }
  static async getMarketing(data) {
    let res = await this.request("api/marketing", data, "post");
    return res.data;
  }
}

export default InvolveApi;
