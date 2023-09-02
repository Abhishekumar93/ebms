import { IUsersList } from "./user.interface";

export interface IPaginatedUserList {
  page_count: number;
  next: string | null;
  previous: string | null;
  results: IUsersList[];
}
