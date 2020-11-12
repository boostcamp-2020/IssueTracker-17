import axios from 'axios';

const host = HOST;

export const getComments = async (issueId) => {
  const apiurl = host + `/comment/${issueId}`;
  const res = await axios.get(apiurl);
  return res.data.result;
};

export const updateComment = async (data) => {
  const apiurl = `http://localhost:3000/comment`;
  const res = await axios.put(apiurl, data);
  return res.data.result;
};

export const postComment = async (data) => {
  const apiurl = 'http://localhost:3000/comment/';
  const res = await axios.post(apiurl, data);
  return res.data.result;
};
