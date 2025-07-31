export type Location = {
  latitude: number;
  longitude: number;
};

export type JyotirliingType = {
    _id: string;
  name: string;
  city: string;
  state: string;
  imgPath: string;
  description: string;
  location?: Location;
  history?: string;
};

