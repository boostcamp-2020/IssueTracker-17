import axios from 'axios';

const host = HOST;

export const getComments = async (issueId) => {
  const apiurl = host + `/comment/${issueId}`;
  const res = await axios.get(apiurl);
  return res.data.result;
};
