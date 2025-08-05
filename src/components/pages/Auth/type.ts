export type user = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type countryType = {
  id?: number | null | undefined;
  name?: string | null | undefined;
  iso2?: string | null | undefined;
  iso3?: string | null | undefined;
  phonecode?: number | null | undefined;
  capital: string | null | undefined;
  currency: string | null | undefined;
  native: string | null | undefined;
  emoji: string | null | undefined;
};

export type stateType = {
  id?: number | null | undefined;
  iso2?: string | null | undefined;
  name?: string | null | undefined;
};

export type cityType = {
  id?: number | null | undefined;
  latitude?: string | null | undefined;
  longitude?: string | null | undefined;
  name?: string | null | undefined;
};


export type addressType = {
  addressLine1?: string | null | undefined;
  addressLine2?: string | null | undefined;
  zipCode?: number | null | undefined;
  country?: countryType | null | undefined;
  state?: stateType | null | undefined;
  city?: cityType | null | undefined;
};
