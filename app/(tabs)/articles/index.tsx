import { ArticleCard, ArticleCardProps } from "@/components/ArticleCard";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { Pill } from "@/components/Pill";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ArticleResponse } from "@/constants/types";
import http from "@/utils/http";
import { serializeArticles } from "@/utils/serializeArticles";
import { GraduationCap, School } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = [
  {
    title: "Students",
    icon: GraduationCap,
    key: "students",
    slug: "/universities",
  },
  {
    title: "Institutions",
    icon: School,
    key: "institutions",
    slug: "/programs",
  },
];

export const Articles = () => {
  const [articles, setArticles] = useState<ArticleCardProps[]>([]);
  const [activeTab, setActiveTab] = useState<string>();

  const fetchArticles = useCallback(async (key?: string) => {
    let url = "/articles";
    if (key) {
      url += `/?filter[type]=${key}`;
    }

    const data = await http.get<{
      data: ArticleResponse[];
    }>(url);

    if (!data) return null;
    return data.data;
  }, []);

  useEffect(() => {
    fetchArticles(activeTab).then((data) => {
      if (data) {
        setArticles(serializeArticles(data, "horizontal"));
      }
    });
  }, [activeTab, fetchArticles]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      className="px-4 py-12"
    >
      <FocusAwareStatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      <VStack>
        <Box>
          <HStack>
            <Box className="text-white rounded-lg flex-1">
              {/* <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className="h-12 rounded-2xl px-4 border text-white"
              >
                <InputIcon as={SearchIcon} />
                <InputField placeholder="Search" className="rounded-lg" />
              </Input> */}
              <Text className="text-primary-500 text-3xl">Articles</Text>
            </Box>
          </HStack>
          <HStack>
            <Box className="py-4">
              <HStack space="md">
                {tabs.map(({ title, icon, slug, key }) => (
                  <Pressable
                    key={slug}
                    onPress={() =>
                      setActiveTab(activeTab === key ? undefined : key)
                    }
                  >
                    <Pill
                      iconSize={20}
                      text={title}
                      icon={icon}
                      isActive={activeTab === key}
                    />
                  </Pressable>
                ))}
              </HStack>
            </Box>
          </HStack>
        </Box>
      </VStack>
      <Box className="pt-8">
        <FlatList
          data={articles}
          renderItem={({ item }) => <ArticleCard {...item} />}
          keyExtractor={(item) => item.slug}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </SafeAreaView>
  );
};

export default Articles;
