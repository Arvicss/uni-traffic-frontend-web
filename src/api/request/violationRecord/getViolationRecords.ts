import api from "@/api/axios";
import { handleApiRequestError } from "@/lib/utils";
import type { AxiosError } from "axios";

export const getViolationRecords = async ({
  id,
  vehicleId,
  userId,
  violationId,
  reportedById,
  sort,
  searchKey,
  status,
  count,
  page
}: {
  id?: string;
  vehicleId?: string;
  userId?: string;
  violationId?: string;
  reportedById?: string;
  sort?: 1 | 2;
  searchKey?: string;
  status?: string;
  count?: number;
  page?: number;
}) => {
  try {
    const response = await api.get("/violation-record/search", {
      params: {
        id,
        vehicleId,
        userId,
        violationId,
        reportedById,
        sort,
        searchKey,
        status,
        count,
        page
      }
    });

    return response.data;
  } catch (err) {
    handleApiRequestError(err as AxiosError, "Something went wrong fetching violation records");
  }
};
