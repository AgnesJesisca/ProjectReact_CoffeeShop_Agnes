import axios from "axios";

const API_URL =
  "https://qcowiyjtrslxzcvmqcia.supabase.co/rest/v1/Users";

const API_KEY =
  "sb_publishable_mapIPeI9y3UD04_7xSnwbQ_R0-dSw1i";

const headers = {
  apikey: API_KEY,
  "Content-Type": "application/json",
};

export const usersAPI = {
  async fetchUsers() {
    const response =
      await axios.get(
        API_URL,
        { headers }
      );

    return response.data;
  },

 async createUser(data) {
  const response = await axios.post(
    API_URL,
    data,
    { headers }
  );

  return response.data;
},

async updateUser(id, data) {
  const response = await axios.patch(
    `${API_URL}?id=eq.${id}`,
    data,
    { headers }
  );

  return response.data;
},

async deleteUser(id) {
  const response = await axios.delete(
    `${API_URL}?id=eq.${id}`,
    { headers }
  );

  return response.data;
},
}