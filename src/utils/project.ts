import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { Item } from "../screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useProjects = (param?: Partial<Item>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Item[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));

    // eslint-disable-next-line
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Item>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Item>) => {
    console.log(12);
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
