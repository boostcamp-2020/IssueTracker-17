import axios from 'axios';

export const postIssue = async (data) => {
  const apiurl = 'http://localhost:3000/issue/';
  const res = await axios.post(apiurl, data);
  return res.data;
};

export async function getissueList(data = '') {
  const apiurl = 'http://115.85.181.19:3000/issue' + data;
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
