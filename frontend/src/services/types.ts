export interface PaginationParams {
  limit?: number;
  order?: "-1" | "1";
  skip?: number;
  sort?: string;
}

export type PaginationType = {
  limit: number;
  order: "-1" | "1";
  skip: number;
  sort: string;
  total: number;
};
