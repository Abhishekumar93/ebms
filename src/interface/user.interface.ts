export interface IUserLogin {
  email: string;
  password: string;
  staff_id?: string;
}

export interface IUserData extends IUserLogin {
  first_name: string;
  last_name: string;
  phone_number?: string;
  consumer_number?: string;
  is_staff: boolean;
}

export interface IUsersList {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  consumer_number?: string;
  staff_id?: string;
  is_active?: boolean;
}

export interface IUserDetail extends IUsersList {
  phone_number: string;
  date_joined: Date;
  last_login: Date;
}
