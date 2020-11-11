import axios from 'axios';

export async function getLabelList() {
  const apiurl = 'http://115.85.181.19:3000/label/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
}

export async function createLabelList(data) {
  const apiurl = 'http://115.85.181.19:3000/label/';
  let res = await axios.post(apiurl, data);
  res = res.data.result;
  return res;
}

export async function updateLabelList(data) {
  const apiurl = 'http://115.85.181.19:3000/label/';
  let res = await axios.put(apiurl, data);
  res = res.data.result;
  return res;
}

export async function deleteLabelList(data) {
  const apiurl = 'http://115.85.181.19:3000/label/';
  let res = await axios.delete(apiurl, { data: data });
  res = res.data.result;
  return res;
}
