import axios from 'axios';

export async function getMileStoneList() {
  const apiurl = 'http://localhost:3000/milestone/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
}
