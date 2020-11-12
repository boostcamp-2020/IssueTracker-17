import axios from 'axios';

export const getLabelList = async () => {
  const apiurl = 'http://115.85.181.19:3000/label/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
};

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

export const updateHasLabel = async (data) => {
  const apiurl = 'http://localhost:3000/has-label/';
  const res = await axios.post(apiurl, data);
  return res;
};

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
