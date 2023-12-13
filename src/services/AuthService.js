import axios from "axios";

export async function signUpService(signUpRequest) {
  // TODO Shoul I add try/catch? How is going to be if the resource is no available.
  // try this function: findAll = async () => {
  const response = await axios.post("/auth/signup", {
    ...signUpRequest
  });

  return response;
}

export async function loginService(loginRequest) {
  // TODO Shoul I add try/catch? How is going to be if the resource is no available.
  // try this function: findAll = async () => {
  const response = await axios.post("/auth/signin", {
    ...loginRequest
  });

  return response;
}

export function checkNickNameAvailabilityService(nickName) {
  if (nickName == null || undefined) {
    return null;
  }

  const response = axios.get("/auth/checkUsernameAvailability", {
    params: {
      nickName
    }
  });

  return response;
}

export function checkEmailAvailabilityService(email) {
  if (email == null || undefined) {
    return null;
  }

  const response = axios.get("/auth/checkEmailAvailability", {
    params: {
      email
    }
  });

  return response;
}
