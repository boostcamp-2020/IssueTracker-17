import axios from 'axios';

export const getUserList = async () => {
  const apiurl = 'http://localhost:3000/user/getAll';
  const res = await axios.get(apiurl);
  return res.data;
};

export const updateAssignee = async (data) => {
  const apiurl = 'http://localhost:3000/assignee/';
  const res = await axios.put(apiurl, data);
  return res;
};
