import axios from "axios";

//https://www.valentinog.com/blog/how-async-await-in-react/
/*
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
*/
export async function findAll() {
  // TODO Shoul I add try/catch? How is going to be if the resource is no available.
  // try this function: findAll = async () => {
  const response = await axios.get("/auth/register", {
    params: {
      id: 12345
    }
  });

  return response.data;
}

export async function getCurrentUser() {
  const response = await axios.get("/users/me");

  return response.data;
}
