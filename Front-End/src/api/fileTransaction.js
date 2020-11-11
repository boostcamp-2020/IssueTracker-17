import axios from 'axios';

export const postFile = async (data) => {
  const apiurl = 'http://localhost:3000/imageUpload/';
  let res = await axios.post(apiurl, data);
  res = res.data.result;
  return res;
};
