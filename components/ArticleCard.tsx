import { useRouter } from "expo-router";
import { Pressable, Image } from "react-native";
import { Box } from "./ui/box";
import { Text } from "./ui/text";

export type ArticleCardProps = {
  slug: string;
  title: string;
  type: string;
  image: string;
  createdAt: string;
  layout?: "horizontal" | "vertical";
};

export const ArticleCard = ({
  slug,
  title,
  type,
  image,
  createdAt,
  layout = "horizontal",
}: ArticleCardProps) => {
  const router = useRouter();
  const navigateToArticle = () => {
    router.navigate(`/articles/${slug}`);
  };
  if (layout === "vertical") {
    return (
      <Pressable key={slug} onPress={navigateToArticle}>
        <Box
          style={{
            borderRadius: 12,
            borderColor: "rgba(17, 17, 19, 0.25)",
            borderWidth: 0.5,
            backgroundColor: "#ffffff",
          }}
        >
          <Box className="pb-2">
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: 140,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              resizeMode="cover"
            />
          </Box>

          <Box className="px-3 py-3">
            <Text numberOfLines={2} className="font-title ">
              {title}
            </Text>
            <Text className="text-xs text-feshia-copy pt-2">{createdAt}</Text>
          </Box>
        </Box>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={navigateToArticle}>
      <Box className="flex flex-1 flex-row pb-2 gap-4 mb-4">
        <Box className="w-2/6">
          <Box className="h-36">
            <Image
              src={image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
              }}
            />
          </Box>
        </Box>
        <Box className="w-4/6">
          <Box className="bg-primary-100 p-1 px-4 flex self-start rounded-lg mb-2">
            <Text className="text-xs">{type}</Text>
          </Box>
          <Text className="text-base font-bold">{title}</Text>
          <Text className="text-xs text-feshia-copy pt-2">{createdAt}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};
