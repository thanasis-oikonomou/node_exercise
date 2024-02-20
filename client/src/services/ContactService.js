import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const ContactService = {
  getContacts: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/recent-contacts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  searchUsers: async (searchText = '') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?searchText=${searchText}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  getContactMessages: async (senderId, recieverId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages?userIds[]=${senderId}&userIds[]=${recieverId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
};

export default ContactService;
