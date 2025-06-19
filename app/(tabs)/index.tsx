import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Image, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  GraduationCap,
  Video,
  Newspaper,
  TrendingUp,
  Computer,
  School,
  Wrench,
} from "lucide-react-native";
import { Title } from "@/components/Title";
import { UniversityCard } from "@/components/UniversityCard";
import { TitleBar } from "@/components/TitleBar";
import { ArticleSlider } from "@/components/ArticleSlider";
import { SearchDrawer } from "@/components/SearchDrawer";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import {
  ArticleResponse,
  UniversityCardProps,
  UniversityResponse,
} from "@/constants/types";
import { serializeUniversities } from "@/utils/serializeUniversities";
import { ArticleCardProps } from "@/components/ArticleCard";
import { serializeArticles } from "@/utils/serializeArticles";
import http from "@/utils/http";

const tabs = [
  {
    title: "Universities",
    icon: <School color="#ec268f" size={20} />,
    slug: "/universities",
  },
  {
    title: "Programs",
    icon: <GraduationCap color="#ec268f" size={20} />,
    slug: "/programs",
  },
  {
    title: "Articles",
    icon: <Newspaper color="#ec268f" size={20} />,
    slug: "/articles",
  },
];

const destinations = [
  { id: 1, name: "United States", source: "https://flagcdn.com/w80/us.png" },
  { id: 2, name: "United Kingdom", source: "https://flagcdn.com/w80/gb.png" },
  { id: 3, name: "Sweden", source: "https://flagcdn.com/w80/se.png" },
  { id: 4, name: "South Korea", source: "https://flagcdn.com/w80/kr.png" },
  { id: 5, name: "Spain", source: "https://flagcdn.com/w80/es.png" },
  { id: 6, name: "Saudi Arabia", source: "https://flagcdn.com/w80/sa.png" },
  { id: 7, name: "Switzerland", source: "https://flagcdn.com/w80/ch.png" },
  { id: 8, name: "Belgium", source: "https://flagcdn.com/w80/be.png" },
  { id: 9, name: "Tunisia", source: "https://flagcdn.com/w80/tn.png" },
  { id: 10, name: "New Zealand", source: "https://flagcdn.com/w80/nz.png" },
];

const studyAreas = [
  {
    id: 1,
    name: "Business & Management",
    icon: <TrendingUp color="#ec268f" size={20} />,
    link: "business",
  },
  {
    id: 2,
    name: "Engineering",
    icon: <Wrench color="#ec268f" size={20} />,
    link: "engineering",
  },
  {
    id: 3,
    name: "Computer Science",
    icon: (
      <Computer color="#ec268f" className="text-feshia-primary" size={20} />
    ),
    link: "computer",
  },

  {
    id: 4,
    name: "Education and Training",
    icon: <School color="#ec268f" size={20} />,
    link: "education and training",
  },
  {
    id: 5,
    name: "Communication & Media",
    icon: <Video color="#ec268f" size={20} />,
    link: "communication and media studies",
  },
  {
    id: 6,
    name: "Business & Management",
    icon: <TrendingUp color="#ec268f" size={20} />,
    link: "business",
  },
];

const Home = () => {
  const router = useRouter();

  const [showDrawer, setShowDrawer] = React.useState(false);
  const [institutions, setInstitutions] = useState<UniversityCardProps[]>([]);
  const [articles, setArticles] = useState<ArticleCardProps[]>([]);

  const fetchData = useCallback(async () => {
    const data = await http.get<{
      universities: UniversityResponse[];
      articles: ArticleResponse[];
    }>("/homepage");

    return { data };
  }, []);

  useEffect(() => {
    fetchData().then(({ data }) => {
      if (data) {
        setInstitutions(serializeUniversities(data.universities));
        setArticles(serializeArticles(data.articles, "vertical"));
      }
    });
  }, [fetchData]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f5f5f5", paddingTop: 24 }}
    >
      <FocusAwareStatusBar
        backgroundColor="#f5f5f5"
        barStyle={"dark-content"}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <Box className="px-4 py-2 ">
          <HStack space="md">
            <Box
              className="flex-1 justify-center px-2 rounded-md h-12 border"
              style={{ borderWidth: 0.5 }}
            >
              <Pressable
                onPress={() => {
                  setShowDrawer(true);
                }}
              >
                <Box className="flex flex-row items-center gap-4 ">
                  <Search color="#999" size={18} />
                  <Text>Search</Text>
                </Box>
              </Pressable>
              <SearchDrawer
                showDrawer={showDrawer}
                onClose={() => setShowDrawer(false)}
              />
            </Box>
          </HStack>
        </Box>

        {/* Tab Navigation */}
        <Box className="px-4 py-2">
          <HStack space="md">
            {tabs.map(({ title, icon, slug }) => (
              <Pressable key={slug} onPress={() => router.navigate(slug)}>
                <Box className="px-4 py-2 bg-background-feshiaGray rounded-lg flex-row items-center gap-2">
                  <Box>{icon}</Box>
                  <Text className="text-feshia-copy">{title}</Text>
                </Box>
              </Pressable>
            ))}
          </HStack>
        </Box>

        <Box className="flex-1 gap-5 pt-4">
          {/* Featured Institutions */}
          <Box>
            <Box className="px-4">
              <TitleBar
                title="Featured Institutions"
                ctaText="See all"
                ctaLink="/universities"
              />
            </Box>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                columnGap: 12,
              }}
            >
              {institutions.map((institution) => (
                <UniversityCard
                  key={institution.slug}
                  slug={institution.slug}
                  name={institution.name}
                  location={institution.location}
                  qsRank={institution.qsRank}
                  internationalStudents={institution.internationalStudents}
                  image={institution.image}
                />
              ))}
            </ScrollView>
          </Box>

          {/* Featured Destinations */}
          <Box>
            <Box className="px-4">
              <HStack className="justify-between items-center">
                <Title>Featured Destinations</Title>
                <Text className="text-primary-500 underline">See all</Text>
              </HStack>
            </Box>

            <Box className="flex flex-row px-4 flex-wrap justify-center items-center pt-4">
              {destinations.map((destination) => (
                <Pressable
                  key={destination.id}
                  className="w-1/3 flex justify-center items-center pb-4"
                  onPress={() =>
                    router.navigate(`/programs?country=${destination.name}`)
                  }
                >
                  <Box>
                    <Image
                      source={{ uri: destination.source }}
                      style={{ width: 64, height: 64 }}
                      className="rounded-full"
                    />
                  </Box>
                  <Box>
                    <Text className="text-center text-sm pt-2 text-cop">
                      {destination.name}
                    </Text>
                  </Box>
                </Pressable>
              ))}
            </Box>
          </Box>

          {/* Featured Study Areas */}
          <Box className="px-4">
            <Box>
              <TitleBar title="Featured Study Areas" ctaText="See all" />
            </Box>

            <Box className="flex flex-row px-4 flex-wrap justify-between items-center pt-4">
              {studyAreas.map((area) => (
                <Pressable
                  key={area.id}
                  className="w-1/3 flex flex-col justify-center items-center pb-5"
                  onPress={() =>
                    router.navigate(`/programs?study_area=${area.link}`)
                  }
                >
                  <Box className="size-10 bg-background-feshiaGray flex items-center justify-center rounded-full">
                    {area.icon}
                  </Box>
                  <Text className="text-sm text-center pt-3 text-feshia-copy">
                    {area.name}
                  </Text>
                </Pressable>
              ))}
            </Box>
          </Box>

          {/* Latest articles */}
          <Box className="pl-4">
            <Box className="pr-4">
              <TitleBar title="Latest Articles" ctaText="See all" ctaLink="/" />
            </Box>

            <Box className="pt-4">
              <ArticleSlider articles={articles} />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
