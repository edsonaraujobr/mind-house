export interface SuccessResponse {
  success: boolean;
  description: string;
}

export interface Paginated<T> {
  nodes: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  nextSkip?: number;
}
