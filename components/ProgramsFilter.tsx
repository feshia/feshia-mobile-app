import {
  CheckIcon,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { Fab, FabIcon } from "@/components/ui/fab";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "./ui/checkbox";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "./ui/slider";

type CurrentFilters = {
  country?: string | string[];
  study_area?: string | string[];
  program_type?: string;
  tuition?: string;
  duration?: string;
};

interface ProgramsFilterProps {
  currentFilters: CurrentFilters;
  onClearAll: () => void;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: CurrentFilters;
  onClearAll: () => void;
}

const durationFilters = [
  {
    label: "1 - 12 months",
    value: "1-12",
  },
  {
    label: "12 - 18 months",
    value: "12-18",
  },
  {
    label: "18 - 24 months",
    value: "18-24",
  },
  {
    label: "> 24 months",
    value: "gt24",
  },
] as const;

const availabelProgramTypes = [
  {
    label: "Bachelors",
    value: "bachelors",
  },
  {
    label: "Masters",
    value: "masters",
  },
  {
    label: "PhD",
    value: "phd",
  },
  {
    label: "MBA",
    value: "mba",
  },
  {
    label: "Research",
    value: "research",
  },
  {
    label: "Certification",
    value: "certification",
  },
] as const;

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  currentFilters,
  onClearAll,
}) => {
  const currentTuition = currentFilters.tuition?.split("-");
  const router = useRouter();
  const [minTuition, setMinTuition] = useState(
    currentTuition ? currentTuition[0] : 5000
  );
  const [maxTuition, setMaxTuition] = useState(
    currentTuition ? currentTuition[1] : 50000
  );
  const [scholarship, setScholarship] = useState("");
  const [durations, setDurations] = useState<string[]>(
    currentFilters.duration?.split("|").map((item) => item) || []
  );
  const [programTypes, setProgramTypes] = useState<string[]>([]);

  const filtersRef = useRef<any>({});

  const applyFilters = () => {
    filtersRef.current = {};

    // Add existing filters from currentFilters
    if (currentFilters.country) {
      filtersRef.current.country = currentFilters.country;
    }
    if (currentFilters.study_area) {
      filtersRef.current.study_area = currentFilters.study_area;
    }

    // Add new filters in the correct format
    if (durations.length > 0) {
      filtersRef.current.duration = durations.join("|");
    }
    if (programTypes.length > 0) {
      filtersRef.current.program_type = programTypes.join("|");
    }
    if (scholarship) {
      filtersRef.current.scholarship = "true";
    }
    // Add tuition range if either value has changed from defaults
    if (minTuition !== 5000 || maxTuition !== 50000) {
      filtersRef.current.tuition = `${minTuition}-${maxTuition}`;
    }
    console.log("Applying filters:", filtersRef.current);
    router.replace({
      pathname: "/(tabs)/programs",
      params: filtersRef.current,
    });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="lg" anchor="bottom">
      <DrawerBackdrop />
      <DrawerContent className="bg-white">
        <DrawerHeader>
          <Text className="text-primary-500 text-xl font-bold">Filters</Text>
          <DrawerCloseButton>
            <X size={24} color="#666" />
          </DrawerCloseButton>
        </DrawerHeader>

        <DrawerBody className="flex-1 justify-betweeen">
          <VStack space="lg">
            <Box>
              <Box>
                <Accordion className="flex gap-10">
                  <AccordionItem
                    value="durations"
                    className="border-b border-background-feshiaGray"
                  >
                    <AccordionHeader>
                      <AccordionTrigger className="focus:web:rounded-lg">
                        {({ isExpanded }: { isExpanded: boolean }) => {
                          return (
                            <>
                              <AccordionTitleText>Durations</AccordionTitleText>
                              {isExpanded ? (
                                <AccordionIcon
                                  as={ChevronUp}
                                  className="mr-3"
                                />
                              ) : (
                                <AccordionIcon
                                  as={ChevronDown}
                                  className="mr-3"
                                />
                              )}
                            </>
                          );
                        }}
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="flex flex-row justify-between flex-wrap">
                      {durationFilters.map((filter) => (
                        <Box key={filter.value} className="w-1/2 p-4">
                          <Checkbox
                            size="md"
                            isInvalid={false}
                            isDisabled={false}
                            isChecked={
                              durations.includes(filter.value) ? true : false
                            }
                            value={
                              durations.includes(filter.value)
                                ? filter.value
                                : ""
                            }
                            onChange={(checked) => {
                              setDurations((prev) =>
                                checked
                                  ? [...prev, filter.value]
                                  : prev.filter((d) => d !== filter.value)
                              );
                            }}
                          >
                            <CheckboxIndicator>
                              <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>{filter.label}</CheckboxLabel>
                          </Checkbox>
                        </Box>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="tuition"
                    className="border-b border-background-feshiaGray"
                  >
                    <AccordionHeader>
                      <AccordionTrigger className="focus:web:rounded-lg">
                        {({ isExpanded }: { isExpanded: boolean }) => {
                          return (
                            <>
                              <AccordionTitleText>Tuition</AccordionTitleText>
                              {isExpanded ? (
                                <AccordionIcon
                                  as={ChevronUp}
                                  className="mr-3"
                                />
                              ) : (
                                <AccordionIcon
                                  as={ChevronDown}
                                  className="mr-3"
                                />
                              )}
                            </>
                          );
                        }}
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="py-6">
                      <Box>
                        <Box className="pb-6 flex flex-row justify-between">
                          <Text>Min</Text>
                          <Text>{minTuition}</Text>
                        </Box>
                        <Slider
                          value={minTuition}
                          size="md"
                          orientation="horizontal"
                          isDisabled={false}
                          isReversed={false}
                          maxValue={50000}
                          onChange={(value) => {
                            setMinTuition(value);
                          }}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </Box>
                      <Box className="pt-12">
                        <Box className="pb-6 flex flex-row justify-between">
                          <Text>Max</Text>
                          <Text>{maxTuition}</Text>
                        </Box>
                        <Slider
                          value={maxTuition}
                          size="md"
                          orientation="horizontal"
                          isDisabled={false}
                          isReversed={false}
                          minValue={minTuition}
                          maxValue={50000}
                          onChange={(value) => {
                            setMaxTuition(value);
                          }}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="scholarship"
                    className="border-b border-background-feshiaGray"
                  >
                    <AccordionHeader>
                      <AccordionTrigger className="focus:web:rounded-lg">
                        {({ isExpanded }: { isExpanded: boolean }) => {
                          return (
                            <>
                              <AccordionTitleText>
                                Scholarship
                              </AccordionTitleText>
                              {isExpanded ? (
                                <AccordionIcon
                                  as={ChevronUp}
                                  className="mr-3"
                                />
                              ) : (
                                <AccordionIcon
                                  as={ChevronDown}
                                  className="mr-3"
                                />
                              )}
                            </>
                          );
                        }}
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="flex flex-row justify-between flex-wrap">
                      <Box className="w-1/2 p-4">
                        <Checkbox
                          size="md"
                          isInvalid={false}
                          isDisabled={false}
                          value={scholarship}
                          onChange={(checked) => {
                            setScholarship("scholarship");
                          }}
                        >
                          <CheckboxIndicator>
                            <CheckboxIcon as={CheckIcon} />
                          </CheckboxIndicator>
                          <CheckboxLabel>Available</CheckboxLabel>
                        </Checkbox>
                      </Box>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="programTypes"
                    className="border-b border-background-feshiaGray"
                  >
                    <AccordionHeader>
                      <AccordionTrigger className="focus:web:rounded-lg">
                        {({ isExpanded }: { isExpanded: boolean }) => {
                          return (
                            <>
                              <AccordionTitleText>
                                Program types
                              </AccordionTitleText>
                              {isExpanded ? (
                                <AccordionIcon
                                  as={ChevronUp}
                                  className="mr-3"
                                />
                              ) : (
                                <AccordionIcon
                                  as={ChevronDown}
                                  className="mr-3"
                                />
                              )}
                            </>
                          );
                        }}
                      </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent className="flex flex-row justify-between flex-wrap">
                      {availabelProgramTypes.map((filter) => (
                        <Box key={filter.value} className="w-1/2 p-4">
                          <Checkbox
                            size="md"
                            isInvalid={false}
                            isDisabled={false}
                            isChecked={
                              programTypes.includes(filter.value) ? true : false
                            }
                            value={
                              programTypes.includes(filter.value)
                                ? filter.value
                                : ""
                            }
                            onChange={(checked) => {
                              setProgramTypes((prev) =>
                                checked
                                  ? [...prev, filter.value]
                                  : prev.filter((d) => d !== filter.value)
                              );
                            }}
                          >
                            <CheckboxIndicator>
                              <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>{filter.label}</CheckboxLabel>
                          </Checkbox>
                        </Box>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
          </VStack>
          <HStack space="md" className="w-full mt-20">
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => {
                // Clear all local state
                setDurations([]);
                setProgramTypes([]);
                setScholarship("");
                setMinTuition(5000);
                setMaxTuition(50000);
                // Clear the filters ref
                filtersRef.current = {};
                // Apply empty filters
                onClearAll();
                onClose();
              }}
            >
              <Text className="text-feshia-copy font-semibold">Clear All</Text>
            </Button>
            <Button
              variant="solid"
              className="flex-1 bg-primary-500"
              onPress={applyFilters}
            >
              <Text className="text-white font-semibold">Apply Filters</Text>
            </Button>
          </HStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const ProgramsFilter: React.FC<ProgramsFilterProps> = ({
  currentFilters,
  onClearAll,
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <>
      {/* Floating Filter Button */}
      <Fab
        size="xl"
        placement="bottom right"
        className="bg-primary-500"
        onPress={() => setIsFilterDrawerOpen(true)}
      >
        <FabIcon as={SlidersHorizontal} />
      </Fab>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => {
          setIsFilterDrawerOpen(false);
        }}
        currentFilters={currentFilters}
        onClearAll={onClearAll}
      />
    </>
  );
};
