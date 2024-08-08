import axios from 'axios';
import { token } from '../token';

const API_BASE_URL = 'https://1.94.138.235:8080/api';

export async function login(username, password) {
  try {
    const url = `${API_BASE_URL}/auth/login`;
    const response = await axios.post(url, {
      username: username,
      password: password,
    });

    if (response.status === 200) {
      token.value = response.data.accessToken; // 修改 token 的值
      console.log(token.value);
      return response.data;
    } else {
      throw new Error('Login failed due to server error');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}
