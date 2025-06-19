import { useRouter } from "expo-router";
import { Pressable, Image } from "react-native";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";

export type ProgramCardProps = {
  slug: string;
  name: string;
  tuition?: string;
  duration?: string;
  scholarship?: string;
  image: any;
};

export const ProgramCard = ({
  slug,
  name,
  tuition,
  duration,
  image,
  scholarship,
}: ProgramCardProps) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.navigate(`/universities/${slug}`)}>
      <Box
        style={{
          width: "100%",
          borderRadius: 12,
          borderColor: "rgba(17, 17, 19, 0.25)",
          borderWidth: 0.5,
          backgroundColor: "#ffffff",
        }}
      >
        <Box>
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 140,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
            }}
            resizeMode="cover"
          />
        </Box>

        <Box className="px-4 py-4">
          <Text numberOfLines={2} className="font-title h-[40px]">
            {name}
          </Text>

          <HStack className="pt-3 justify-between">
            <ProgramCardAttribute title="Tuition" text={tuition || ""} />

            <ProgramCardAttribute title="Duration" text={duration || ""} />
          </HStack>

          <HStack className="pt-2 flex justify-between">
            <ProgramCardAttribute
              title="Scholarship"
              text={scholarship || ""}
            />
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
};

const ProgramCardAttribute = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <VStack>
      <Text className="text-xs text-feshia-copy">{title}</Text>
      <Text className="text-xs font-title font-semibold">{text}</Text>
    </VStack>
  );
};
