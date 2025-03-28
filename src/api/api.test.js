import API from "./api";

export const fetchTestData = async () => {
    try {
      const response = await API.get('/test'); // Call the /test route
      return response.data;
    } catch (error) {
      console.error('Error fetching test data:', error);
      throw error;
    }
  };