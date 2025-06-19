import React, { useState } from "react";
import { Pressable, ScrollView, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";

const ProgramSelectionScreen = () => {
  const [activeTab, setActiveTab] = useState("Masters");
  const [expandedSections, setExpandedSections] = useState({});

  const tabs = ["Masters", "General", "Bachelors"];

  const programData = {
    Masters: [
      "Biological Sciences",
      "Medical Related Studies",
      "Architecture",
      "Medicine",
      "Business Administration",
      "Marketing",
      "Anatomy",
      "Journalism",
    ],
    General: [
      "Liberal Arts",
      "General Studies",
      "Interdisciplinary Studies",
      "Pre-Professional Programs",
    ],
    Bachelors: [
      "Computer Science",
      "Engineering",
      "Psychology",
      "English Literature",
      "Mathematics",
      "Physics",
      "Chemistry",
      "History",
    ],
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const TabButton = ({
    title,
    isActive,
    onPress,
  }: {
    title: string;
    isActive: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      className={`flex-1 pb-4 ${isActive ? "border-b-2 border-blue-500" : ""}`}
    >
      <Text
        className={`text-center text-lg font-medium ${
          isActive ? "text-black" : "text-gray-400"
        }`}
      >
        {title}
      </Text>
    </Pressable>
  );

  const ProgramItem = ({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) => (
    <Pressable onPress={onPress}>
      <HStack className="justify-between items-center py-6 px-4 border-b border-gray-100">
        <Text className="text-lg font-medium text-gray-900">{title}</Text>
        <Plus size={24} color="#9CA3AF" />
      </HStack>
    </Pressable>
  );

  return (
    <Box className="flex-1 bg-white">
      {/* Tab Navigation */}
      <Box className="bg-white shadow-sm">
        <HStack className="px-4 pt-4">
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              title={tab}
              isActive={activeTab === tab}
              onPress={() => setActiveTab(tab)}
            />
          ))}
        </HStack>
      </Box>

      {/* Content */}
      <ScrollView className="flex-1">
        <VStack className="px-0">
          {programData[activeTab]?.map((program, index) => (
            <ProgramItem
              key={index}
              title={program}
              onPress={() => toggleSection(program)}
            />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default ProgramSelectionScreen;
