import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) };
    }, {}),
    setSearchParams,
  ] as const;
};
