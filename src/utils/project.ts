import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { Item } from "../screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Item>) => {
  const client = useHttp();
  return useQuery<Item[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Item>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Item>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Item>(["project", { id }], () => client(`projects/${id}`), {
    enabled: Boolean(id),
  });
};
