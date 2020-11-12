import axios from 'axios';

const host = HOST;

export const postFile = async (data) => {
  const apiurl = host + '/imageUpload/';
  let res = await axios.post(apiurl, data);
  res = res.data.result;
  return res;
};
