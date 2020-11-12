import axios from 'axios';

const host = HOST;

export const getLabelList = async () => {
  const apiurl = host + '/label/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
};

export const updateHasLabel = async (data) => {
  const apiurl = host + '/has-label/';
  const res = await axios.post(apiurl, data);
  return res;
};

export async function createLabelList(data) {
  const apiurl = host + '/label/';
  let res = await axios.post(apiurl, data);
  res = res.data.result;
  return res;
}

export async function updateLabelList(data) {
  const apiurl = host + '/label/';
  let res = await axios.put(apiurl, data);
  res = res.data.result;
  return res;
}

export async function deleteLabelList(data) {
  const apiurl = host + '/label/';
  let res = await axios.delete(apiurl, { data: data });
  res = res.data.result;
  return res;
}

export async function insertHasLabel(data) {
  const apiurl = host + '/has-label/';
  let res = await axios.post(apiurl, data);
  res = res.data.result;
  return res;
}

export async function deleteHasLabel(data) {
  const apiurl = host + `/has-label/${data.issueId}_${data.labelId[0]}`;
  let res = await axios.delete(apiurl);
  res = res.data.result;
  return res;
}
