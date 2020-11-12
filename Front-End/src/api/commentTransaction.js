import axios from 'axios';

export const getComments = async (issueId) => {
  const apiurl = `http://localhost:3000/comment/${issueId}`;
  const res = await axios.get(apiurl);
  return res.data.result;
};
