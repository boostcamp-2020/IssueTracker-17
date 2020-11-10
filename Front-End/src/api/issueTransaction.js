import axios from 'axios';

export async function getissueList() {
  const apiurl = 'http://localhost:3000/issue/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
}
