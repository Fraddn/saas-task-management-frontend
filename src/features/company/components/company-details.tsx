import type { Company } from "../types/company.types";

type CompanyDetailsProps = {
  company: Company;
};

export function CompanyDetails({ company }: CompanyDetailsProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <dl className="grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Name</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900">
            {company.name}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Slug</dt>
          <dd className="mt-1.5 text-sm text-gray-900">{company.slug}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Created</dt>
          <dd className="mt-1.5 text-sm text-gray-900">
            {new Date(company.createdAtUtc).toLocaleDateString()}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Last Updated</dt>
          <dd className="mt-1.5 text-sm text-gray-900">
            {new Date(company.updatedAtUtc).toLocaleDateString()}
          </dd>
        </div>
      </dl>
    </div>
  );
}
