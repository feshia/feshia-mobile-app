import { Dropdown } from "react-native-element-dropdown";
import { Title } from "./Title";
import { Box } from "./ui/box";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { Text } from "./ui/text";
import { useHomeSearch } from "@/hooks/useHomeSearch";

export const SearchDrawer = ({
  showDrawer,
  onClose,
}: {
  showDrawer: boolean;
  onClose: () => void;
}) => {
  const {
    availableDestinations,
    availableProgramTypes,
    availableStudyAreas,
    onSearchSelect,
    handleSearchClick,
  } = useHomeSearch();

  return (
    <Drawer isOpen={showDrawer} onClose={onClose} size="md" anchor="bottom">
      <DrawerBackdrop />
      <DrawerContent className="bg-white rounded-t-2xl">
        <DrawerHeader>
          <Title>Get started with your search</Title>
        </DrawerHeader>
        <DrawerBody>
          <Box className="flex-1 justify-center">
            <Box>
              <Dropdown
                data={availableProgramTypes}
                onChange={(item) => onSearchSelect("program_type", item.value)}
                labelField="label"
                valueField="value"
                minHeight={170}
                placeholder="What level do you want to study?"
                style={dropdownStyles.dropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
              />

              <Dropdown
                data={availableDestinations}
                onChange={(item) => onSearchSelect("country", item.value)}
                labelField="label"
                valueField="value"
                placeholder="Where do you want to study?"
                style={dropdownStyles.dropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                dropdownPosition="top"
              />

              <Dropdown
                data={availableStudyAreas}
                onChange={(item) => onSearchSelect("study_area", item.value)}
                labelField="label"
                valueField="value"
                placeholder="What study area are you interested in?"
                style={dropdownStyles.dropdown}
                placeholderStyle={dropdownStyles.placeholderStyle}
                selectedTextStyle={dropdownStyles.selectedTextStyle}
                dropdownPosition="top"
              />

              <Box className="pt-10">
                <Button
                  onPress={() => {
                    handleSearchClick();
                    onClose();
                  }}
                  className="flex-1"
                >
                  <SearchIcon color="#fff" size={18} />
                  <Text className="text-white font-bold">Search</Text>
                </Button>
              </Box>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const dropdownStyles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
