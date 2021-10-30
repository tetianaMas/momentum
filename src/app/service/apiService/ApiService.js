class ApiService {
  async get(link) {
    try {
      const data = await fetch(link);

      return await data.json();
    } catch (err) {
      console.log(err.message);
    }
  }
}

export const apiService = new ApiService();
