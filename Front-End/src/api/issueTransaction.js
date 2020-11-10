import axios from 'axios';

export const postIssue = async (data) => {
  const apiurl = 'http://localhost:3000/issue/';
  const res = await axios.post(apiurl, data);
  return res.data;
};
