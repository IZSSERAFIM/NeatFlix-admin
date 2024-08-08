import axios from 'axios';
import { token } from '../token';

const API_BASE_URL = 'https://1.94.138.235:8080/api'; // 假设你的API基础路径

const AdminService = {
  getComments: () => {
    return axios.post(`${API_BASE_URL}/comment/getOnHoldComments`);
  },
  changeComment: (commentId, status) => {
    return axios.post(`${API_BASE_URL}/comment/changeCommentStatus`, {
      id: commentId,
      status: status,
    });
  },
  getUsers: () => {
    return axios.get(`${API_BASE_URL}/user/all`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  },
  manageUser: (username, nickname, isBanned) => {
    return axios.post(`${API_BASE_URL}/user/changeUserInfo`, {
      userName: username,
      nickName: nickname,
      isBanned: isBanned,
    });
  },
};

export default AdminService;
