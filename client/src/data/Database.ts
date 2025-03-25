export interface Cars {
  id: string;
  car_name: string;
  car_color: string;
  release_year: string;
  gearshift: string;
  condition: string;
  distance: string;
  car_sign: string;
  car_price: string;
  car_image: string;
}

export interface Brands {
  id: string;
  brand_name: string;
}

export interface Users {
  id_user: number;
  user_name: string;
  user_email: string;
  user_password: string;
  user_image: string;
}
