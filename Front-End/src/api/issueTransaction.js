import axios from 'axios';

const host = HOST;

export const postIssue = async (data) => {
  const apiurl = host + '/issue/';
  const res = await axios.post(apiurl, data);
  return res.data;
};

export async function getissueList(data = '') {
  const apiurl = host + `/issue${data}`;
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
}

export const getIssueDetails = async (issueId) => {
  const apiurl = host + `/issue/${issueId}`;
  let res = await axios.get(apiurl);
  [res] = res.data.result;
  return res;
};

export const updateIssue = async (data) => {
  const apiurl = 'http://localhost:3000/issue/';
  const res = await axios.put(apiurl, data);
  return res.data.result;
};
