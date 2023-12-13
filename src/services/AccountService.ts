import axios from "axios";
import AccountDTO from "../payloads/dto/AccountsDTO";

interface ServerResponse {
  data: AccountDTO;
}

export function getAllAccounts() {
  const response = axios.get("/accounts", {});

  return response;
}

export function getTotalNumberAccountsByUser() {
  const response = axios.get("/accounts/total", {});

  return response;
}

export async function getAccount(accountId: string) {
  const response = await axios.get("/accounts/", {
    params: {
      id: accountId
    }
  });

  return response.data[0]; // typescript + axios problem.
}
