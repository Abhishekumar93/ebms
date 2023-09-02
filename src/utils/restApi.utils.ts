import axios from "axios";

const commonHeaderData = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const postApi = async (
  apiUrl: string,
  body: any = {},
  headers: any = {}
) => {
  let response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${apiUrl}`,
    body,
    {
      headers: {
        ...commonHeaderData,
        ...headers,
      },
    }
  );

  return response;
};

export const getApi = async (apiUrl: string, headers: any = {}) => {
  let response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${apiUrl}`,
    {
      headers: {
        ...commonHeaderData,
        ...headers,
      },
    }
  );

  return response;
};

export const putApi = async (
  apiUrl: string,
  body: any = {},
  headers: any = {}
) => {
  let response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${apiUrl}`,
    body,
    {
      headers: {
        ...commonHeaderData,
        ...headers,
      },
    }
  );

  return response;
};
