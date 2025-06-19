import { ProgramTypeResponse } from "@/constants/types";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type AvailableFilters = {
  program_types: { name: string }[];
  destinations: { name: string }[];
  study_areas: { name: string }[];
};

export const useHomeSearch = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<AvailableFilters>({
    program_types: [],
    destinations: [],
    study_areas: [],
  });

  const fetchData = useCallback(async () => {
    const response = await fetch(
      "https://services.feshia.com/api/homepage/filters",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as AvailableFilters;
    return data;
  }, []);

  useEffect(() => {
    fetchData().then((data) => {
      setFilters(data);
    });
  }, [fetchData]);

  const [availableProgramTypes, setAvailableProgramTypes] = useState<Option[]>(
    []
  );
  const [availableDestinations, setAvailableDestinations] = useState<Option[]>(
    []
  );
  const [availableStudyAreas, setAvailableStudyAreas] = useState<Option[]>([]);

  const searchQueries = useRef<{
    studyArea: string | null;
    destination: string | null;
    programType: string | null;
  }>({
    studyArea: null,
    destination: null,
    programType: null,
  });

  const transformResponseData = (
    type: "programs" | "destinations" | "study_areas",
    response: unknown
  ) => {
    switch (type) {
      case "programs":
        return (response as ProgramTypeResponse[]).map((item) => ({
          label: item.name,
          value: item.name.toLowerCase(),
        }));
      case "destinations":
        return (response as { name: string }[]).map((item) => ({
          label: item.name,
          value: item.name.toLowerCase(),
        }));
      case "study_areas":
        return (response as { name: string }[]).map((item) => ({
          label: item.name,
          value: item.name.toLowerCase(),
        }));
      default:
        return [];
    }
  };

  const prepareFilters = useCallback(() => {
    setAvailableProgramTypes(
      transformResponseData("programs", filters.program_types)
    );
    setAvailableDestinations(
      transformResponseData("destinations", filters.destinations)
    );
    setAvailableStudyAreas(
      transformResponseData("study_areas", filters.study_areas)
    );
  }, [filters]);

  useEffect(() => {
    prepareFilters();
  }, [filters, prepareFilters]);

  const onSearchSelect = useCallback(
    async (field: string, value: string | null) => {
      if (!value) {
        return;
      }
      searchQueries.current = { ...searchQueries.current, [field]: value };
    },
    []
  );

  const handleSearchClick = () => {
    const searchParams = Object.keys(searchQueries.current).reduce(
      (
        result: Partial<Record<keyof typeof searchQueries.current, string>>,
        key
      ) => {
        const k = key as keyof typeof searchQueries.current;
        if (searchQueries.current[k] !== null) {
          result[k] = searchQueries.current[k] as string;
        }
        return result;
      },
      {}
    );
    if (Object.keys(searchParams).length === 0) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    const searchString = params.toString();
    router.navigate(`/programs?${searchString}`);
  };

  return {
    availableProgramTypes,
    availableDestinations,
    availableStudyAreas,
    onSearchSelect,
    handleSearchClick,
  };
};
