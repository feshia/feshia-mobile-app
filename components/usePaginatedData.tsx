import { useState, useCallback, useEffect, useRef } from "react";

type UsePaginatedDataOptions<T> = {
  url: string;
  serializer?: (...args: any) => T[];
  headers?: Record<string, string>;
  pageParam?: string;
  initialPage?: number;
};

type UsePaginatedDataReturn<T> = {
  data: T[];
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  loadNextPage: () => void;
  refetch: () => void;
  hasMore: boolean;
};

export const usePaginatedData = <T = unknown,>({
  url,
  serializer,
  headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  pageParam = "page",
  initialPage = 1,
}: UsePaginatedDataOptions<T>): UsePaginatedDataReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(
    async (page: number): Promise<T[]> => {
      try {
        setIsLoading(true);
        setError(null);

        const separator = url.includes("?") ? "&" : "?";
        const fetchUrl = `${url}${separator}${pageParam}=${page}`;
        console.log("Fetching URL:", fetchUrl);

        const response = await fetch(fetchUrl, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        setIsLoading(false);

        // Handle different response structures
        let items: any[] = [];
        if (responseData.data) {
          items = Array.isArray(responseData.data) ? responseData.data : [];
        } else if (Array.isArray(responseData)) {
          items = responseData;
        } else if (responseData.items) {
          items = Array.isArray(responseData.items) ? responseData.items : [];
        }

        // Check if there are more pages
        // if (items.length === 0) {
        //   setHasMore(false);
        // }

        // Apply serializer if provided
        return serializer ? serializer(items) : items;
      } catch (err) {
        setIsLoading(false);
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error fetching data:", err);
        return [];
      }
    },
    [url, headers, pageParam, serializer]
  );

  const loadNextPage = useCallback(() => {
    if (!isLoading) {
      setCurrentPage((prev: number) => prev + 1);
    }
  }, [isLoading]);

  const refetch = useCallback(() => {
    setData([]);
    setCurrentPage(initialPage);
    setError(null);
    setHasMore(true);
  }, [initialPage]);
  const prevUrl = useRef<string | null>(null);
  useEffect(() => {
    // const fetchPageData = async () => {
    //   const newData = await fetchData(currentPage);

    //   if (currentPage === initialPage) {
    //     setData(newData);
    //   } else {
    //     setData((prev) => [...prev, ...newData]);
    //   }
    // };
    fetchData(currentPage).then((newData) => {
      if (prevUrl.current !== url) {
        setData(newData);
        prevUrl.current = url;
      } else {
        setData((prev) => [...prev, ...newData]);
      }
    });

    // fetchPageData();
    return () => {
      setData([]);
      setCurrentPage(initialPage);
      setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, url]);

  return {
    data,
    currentPage,
    isLoading,
    error,
    loadNextPage,
    refetch,
    hasMore,
  };
};
