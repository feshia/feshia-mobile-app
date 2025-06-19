import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { featuredInstitutions } from "@/components/mocks";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { UniversityCard } from "@/components/UniversityCard";

import { serializeUniversities } from "@/utils/serializeUniversities";
import { SearchIcon } from "lucide-react-native";
import { useCallback, useEffect, useState, useRef } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { UniversityCardProps } from "@/constants/types";

export default function Universities() {
  const [universities, setUniversities] = useState<UniversityCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UniversityCardProps[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const fetchUniversities = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const url =
        "https://services.feshia.com/api/universities" + "?page=" + page;
      console.log("url", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setIsLoading(false);

      return serializeUniversities(data.data);
    } catch (error) {
      // setIsLoading(false);
      console.error("Error fetching universities:", error);
      return [];
    }
  }, []);

  const searchUniversities = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      setIsSearching(true);
      const url = `https://services.feshia.com/api/universities?filter[name]=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const results = serializeUniversities(data.data);
      setSearchResults(results);
      setShowSearchDropdown(true);
    } catch (error) {
      console.error("Error searching universities:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchTerm(text);

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout for debouncing
      searchTimeoutRef.current = setTimeout(() => {
        searchUniversities(text);
      }, 300);
    },
    [searchUniversities]
  );

  const handleSearchResultSelect = useCallback(
    (university: UniversityCardProps) => {
      setSearchTerm(university.name);
      setShowSearchDropdown(false);
      router.push(`/universities/${university.slug}` as any);
    },
    [router]
  );

  const handleSearchFocus = useCallback(() => {
    if (searchResults.length > 0) {
      setShowSearchDropdown(true);
    }
  }, [searchResults]);

  const handleSearchBlur = useCallback(() => {
    // Delay hiding dropdown to allow selection
    setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  }, []);

  useEffect(() => {
    const universitiesData = fetchUniversities(currentPage);
    universitiesData.then((data) => {
      setUniversities((prev) => [...prev, ...data]);
    });
  }, [fetchUniversities, currentPage]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FocusAwareStatusBar
        backgroundColor="#ec268f"
        barStyle={"light-content"}
      />
      <HStack>
        <Box className=" flex-1 bg-primary-500 rounded-b-2xl px-4 pt-16 pb-10">
          <Box className="text-white rounded-lg relative">
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              className="h-16 rounded-lg px-4 bg-primary-0 text-white"
            >
              <InputIcon as={SearchIcon} />
              <InputField
                placeholder="University name..."
                className="rounded-lg"
                value={searchTerm}
                onChangeText={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
            </Input>

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <Box
                className="absolute top-full left-0 right-0 bg-white rounded-lg mt-2 z-10 pb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 8,
                  maxHeight: 300,
                }}
              >
                {isSearching ? (
                  <Box className="p-4 items-center">
                    <ActivityIndicator size="small" />
                    <Text className="mt-2 text-gray-600">Searching...</Text>
                  </Box>
                ) : searchResults.length > 0 ? (
                  <VStack className="py-2">
                    {searchResults
                      .slice(0, 5)
                      .map((university: UniversityCardProps, index: number) => (
                        <Pressable
                          key={university.slug}
                          className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                          onPress={() => handleSearchResultSelect(university)}
                        >
                          <VStack>
                            <Text className="font-medium text-gray-900">
                              {university.name}
                            </Text>
                            <Text className="text-sm text-gray-600">
                              {university.location}
                            </Text>
                          </VStack>
                        </Pressable>
                      ))}
                  </VStack>
                ) : (
                  <Box className="p-4">
                    <Text className="text-gray-600 text-center">
                      No universities found
                    </Text>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </HStack>
      <Box className="flex-1 gap-5 px-4 pt-10">
        <FlatList
          data={universities}
          renderItem={({ item }: { item: UniversityCardProps }) => (
            <Box className="w-1/2 p-1">
              <UniversityCard
                slug={item.slug}
                name={item.name}
                location={item.location}
                qsRank={item.qsRank}
                internationalStudents={item.internationalStudents}
                image={item.image}
                size="sm"
              />
            </Box>
          )}
          numColumns={2}
          keyExtractor={(item: UniversityCardProps, index: number) => {
            return item.slug + index;
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => setCurrentPage((prev) => prev + 1)}
          onEndReachedThreshold={0.8}
          ListFooterComponent={() => {
            if (isLoading) {
              // Show loader at the end of list when fetching next page data.
              return <ActivityIndicator size={"large"} />;
            }
          }}
        />
      </Box>
    </SafeAreaView>
  );
}
