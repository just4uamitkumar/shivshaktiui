
const headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "QmJPN0tPOGVMZGlFU3JSVTBXV0psQTM4SnFLbG01Z1dFWVVTUHRyRQ=="
);

const requestOptions: RequestInit = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

export type iso = {
  stateIso2:string | null | undefined
  countryIso2:string | null | undefined
}

export const getCountry = async () => {
  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries`,
    requestOptions
  );
  const result = await response.text();
  const data = JSON.parse(result);
  return data;
};

export const getState = async (input:string) => {
  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${input}/states`,
    requestOptions
  );
  const result = await response.text();
  const data = JSON.parse(result);
  return data;
}

export const getCity = async (input:iso) => {
  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${input.countryIso2}/states/${input.stateIso2}/cities`,
    requestOptions
  );
  const result = await response.text();
  const data = JSON.parse(result);
  return data;
}

