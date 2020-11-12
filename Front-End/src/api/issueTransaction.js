import axios from 'axios';

export const postIssue = async (data) => {
  const apiurl = 'http://localhost:3000/issue/';
  const res = await axios.post(apiurl, data);
  return res.data;
};

export async function getissueList() {
  const apiurl = 'http://localhost:3000/issue/';
  let res = await axios.get(apiurl);
  res = res.data.result;
  return res;
}

export const getIssueDetails = async (issueId) => {
  const apiurl = `http://localhost:3000/issue/${issueId}`;
  let res = await axios.get(apiurl);
  [res] = res.data.result;
  return res;
};

export const updateIssue = async (data) => {
  const apiurl = 'http://localhost:3000/issue/';
  const res = await axios.put(apiurl, data);
  return res.data.result;
};
