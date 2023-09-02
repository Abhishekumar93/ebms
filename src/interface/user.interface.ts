export interface IUserLogion {
  email: string;
  password: string;
  staff_id?: string;
}

export interface IUserData extends IUserLogion {
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
