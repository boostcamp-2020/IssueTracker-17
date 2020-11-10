import axios from 'axios';

export async function getLabelList() {
  const apiurl = 'http://localhost:3000/label/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
}
