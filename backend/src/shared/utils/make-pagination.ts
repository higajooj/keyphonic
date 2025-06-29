import { PaginationInput } from "../dto/pagination.dto";

export const makePagination = (pagination: PaginationInput) => {
  return {
    skip: pagination.skip,
    take: pagination.limit,
    orderBy: { [pagination.sort]: pagination.order === "1" ? "asc" : "desc" },
  };
};
