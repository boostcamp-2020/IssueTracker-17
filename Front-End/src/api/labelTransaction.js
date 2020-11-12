import axios from 'axios';

export const getLabelList = async () => {
  const apiurl = 'http://localhost:3000/label/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
};

export const updateHasLabel = async (data) => {
  const apiurl = 'http://localhost:3000/has-label/';
  const res = await axios.post(apiurl, data);
  return res;
};
