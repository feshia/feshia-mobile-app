import { useRouter } from "expo-router";
import { Pressable, Image } from "react-native";
import { Box } from "./ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { UniversityCardProps } from "@/constants/types";

export const UniversityCard = ({
  slug,
  name,
  location,
  qsRank,
  scholarship,
  internationalStudents,
  image,
  size = "lg",
}: UniversityCardProps) => {
  const router = useRouter();
  return (
    <Pressable key={slug} onPress={() => router.push(`/universities/${slug}`)}>
      <Box
        style={{
          width: size === "sm" ? "100%" : 280,
          padding: 8,
          borderRadius: 12,
          borderColor: "rgba(17, 17, 19, 0.25)",
          borderWidth: 0.5,
          backgroundColor: "#ffffff",
        }}
      >
        <Box className="pb-2">
          <Image
            source={typeof image === "string" ? { uri: image } : image}
            style={{ width: "100%", height: 140, borderRadius: 8 }}
            resizeMode="cover"
          />
        </Box>

        <Box>
          <Text numberOfLines={2} className="font-title min-h-12">
            {name}
          </Text>
          <Text className="text-xs text-feshia-copy mt-2">{location}</Text>

          <HStack className="pt-3 justify-between">
            <UniversityCardAttribute
              title="QS Rank"
              text={qsRank}
              size={size}
            />

            {scholarship && (
              <UniversityCardAttribute
                title="Scholarship"
                text={scholarship}
                size={size}
              />
            )}
          </HStack>

          <HStack className="pt-2 flex justify-between">
            <UniversityCardAttribute
              title="Intl. Students"
              text={internationalStudents}
              size={size}
            />

            <UniversityCardAttribute
              title="Intl. Students"
              text={internationalStudents}
              size={size}
            />
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};

const UniversityCardAttribute = ({
  title,
  text,
  size = "lg",
}: {
  title: string;
  text: string;
  size?: "sm" | "lg";
}) => {
  return (
    <VStack>
      <Text className="text-xs text-feshia-copy">{title}</Text>
      <Text
        className={`${size === "sm" ? "text-xs" : "text-sm"} font-title font-semibold`}
      >
        {text}
      </Text>
    </VStack>
  );
};
