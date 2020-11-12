import axios from 'axios';

const host = HOST;

export const getUserList = async () => {
  const apiurl = host + '/user/getAll';
  const res = await axios.get(apiurl);
  return res.data;
};

export const updateAssignee = async (data) => {
  const apiurl = host + '/assignee/';
  const res = await axios.put(apiurl, data);
  return res;
};
