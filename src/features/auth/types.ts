export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organisationId: string;
  role: string;
};

export type LoginRequest = {
  companySlug: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type RefreshSessionResponse = {
  accessToken: string;
  user: AuthUser;
};

export type RegisterCompanyRequest = {
  companyName: string;
  companySlug: string;
  adminEmail: string;
  adminPassword: string;
  adminFirstName: string;
  adminLastName: string;
};

export type RegisterCompanyResponse = {
  organisationId: string;
  adminUserId: string;
};