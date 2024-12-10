export interface PaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationMeta {
  take: number;
  page: number;
  total: number;
}

export interface PageableRespons<T> {
  data: T[];
  meta: PaginationMeta;
}
