export type UserRole = "Admin" | "Employee";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isDisabled: boolean;
  organisationId: string;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export type UserPagedResult = {
  items: User[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type CreateUserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
};

export type UpdateUserRequest = {
  email?: string;
  role?: UserRole;
  isDisabled?: boolean;
};
