import axios from 'axios';
export const STATUS = { open: 0, closed: 1 };

const host = 'http://localhost:3000';

export async function getMileStoneList() {
  const apiurl = host + '/milestone/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
}
export async function getMileStoneById(id) {
  const apiurl = host + `/milestone/${id}`;
  let res = await axios.get(apiurl);
  res = res.data.result[0];
  return res;
}

export async function addNewMileStone(data) {
  try {
    const apiurl = host + '/milestone/';
    let res = await axios.post(apiurl, data);
    return true;
  } catch (e) {
    return false;
  }
}
export async function editNewMileStone(data) {
  try {
    const apiurl = host + `/milestone/`;
    let res = await axios.put(apiurl, data);
    return true;
  } catch (e) {
    return false;
  }
}
export async function deleteNewMileStone(data) {
  try {
    const apiurl = host + `/milestone/`;
    let res = await axios.delete(apiurl, data);
    return true;
  } catch (e) {
    return false;
  }
}
