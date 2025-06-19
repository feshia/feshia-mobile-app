import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { ProgramCard, ProgramCardProps } from "@/components/ProgramCard";
import { serializePrograms } from "@/utils/serializePrograms";
import { usePaginatedData } from "@/components/usePaginatedData";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { ProgramsFilter } from "@/components/ProgramsFilter";

const allowedFilters = [
  "name",
  "country",
  "city",
  "duration",
  "tuition",
  "program_type",
  "study_area",
];

const createFilters = (params: URLSearchParams) => {
  let filterString = "";
  for (const filter of allowedFilters) {
    const value = params.get(filter);
    if (value) {
      filterString += `filter[${filter}]=${value}&`;
    }
  }
  return filterString.endsWith("&") ? filterString.slice(0, -1) : filterString;
};

export default function Programs() {
  const { country, study_area, program_type, tuition, duration } =
    useLocalSearchParams();
  const router = useRouter();

  let url = "https://services.feshia.com/api/programs";
  if (country || study_area || program_type || tuition || duration) {
    const params = new URLSearchParams();
    if (country) {
      params.set("country", country as string);
    }
    if (study_area) {
      params.set("study_area", study_area as string);
    }
    if (program_type) {
      params.set("program_type", program_type as string);
    }
    if (tuition) {
      params.set("tuition", tuition as string);
    }
    if (duration) {
      params.set("duration", duration as string);
    }
    url += `?${createFilters(params)}`;
  }

  const { data, isLoading, loadNextPage } = usePaginatedData<ProgramCardProps>({
    url,
    serializer: serializePrograms,
  });

  const appliedFilters = [
    country && { key: "country", label: "Country", value: country as string },
    study_area && {
      key: "study_area",
      label: "Study Area",
      value: study_area as string,
    },
    program_type && {
      key: "program_type",
      label: "Program Type",
      value: program_type as string,
    },
    tuition && {
      key: "tuition",
      label: "Tuition",
      value: tuition as string,
    },
    duration && {
      key: "duration",
      label: "Duration",
      value: duration as string,
    },
  ].filter(Boolean) as Filter[];

  const clearAllFilters = () => {
    router.replace("/(tabs)/programs");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      className="px-4 py-8"
    >
      <FocusAwareStatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      <VStack>
        <Box>
          <Text className="text-primary-500 text-3xl font-bold">Programs</Text>
          <Text className="text-feshia-copy text-base pt-2">
            Explore all the programs in our repository where you can find one
            that might the right fit for you.
          </Text>
        </Box>
        <AppliedFilters
          filters={appliedFilters}
          pathname="/(tabs)/programs"
          onClearAll={clearAllFilters}
        />
      </VStack>
      <Box className="pt-8">
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Box className="w-1/2 p-1">
              <ProgramCard
                slug={item.slug}
                name={item.name}
                tuition={item.tuition}
                duration={item.duration}
                scholarship={item.scholarship}
                image={item.image}
              />
            </Box>
          )}
          numColumns={2}
          keyExtractor={(item, index) => item.slug + index}
          showsVerticalScrollIndicator={false}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.8}
          ListFooterComponent={() => {
            if (isLoading) {
              // Show loader at the end of list when fetching next page data.
              return <ActivityIndicator size={"large"} />;
            }
          }}
        />
      </Box>

      <ProgramsFilter
        currentFilters={{
          country,
          study_area,
          program_type: program_type as string,
          tuition: tuition as string,
          duration: duration as string,
        }}
        onClearAll={clearAllFilters}
      />
    </SafeAreaView>
  );
}

interface Filter {
  key: string;
  label: string;
  value: string;
}

interface AppliedFiltersProps {
  filters: Filter[];
  pathname: string;
  onClearAll?: () => void;
}

export const AppliedFilters: React.FC<AppliedFiltersProps> = ({
  filters,
  pathname,
  onClearAll,
}) => {
  const router = useRouter();

  const removeFilter = (filterToRemove: string) => {
    const remainingFilters = filters
      .filter((f) => f.key !== filterToRemove)
      .reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {});

    router.replace({
      pathname,
      params: remainingFilters,
    });
  };

  const clearAllFilters = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  if (filters.length === 0) return null;

  return (
    <Box className="pt-4">
      <HStack space="sm">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            size="sm"
            variant="outline"
            className="border-outline-300 bg-background-50 mb-2"
            onPress={() => removeFilter(filter.key)}
          >
            <Text className="text-feshia-copy font-bold text-xs">
              {filter.label}: {filter.value}
            </Text>
            <X size={14} color="#666" style={{ marginLeft: 4 }} />
          </Button>
        ))}

        <Button
          size="sm"
          variant="solid"
          className="bg-primary-500 mb-2"
          onPress={clearAllFilters}
        >
          <Text className="text-white font-bold text-xs">Clear All</Text>
        </Button>
      </HStack>
    </Box>
  );
};
