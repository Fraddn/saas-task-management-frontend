export type Company = {
  id: string;
  name: string;
  slug: string;
  isDeleted: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export type UpdateCompanyRequest = {
  name?: string;
  slug?: string;
};
