import { Pressable } from "react-native";
import { Text } from "./ui/text";
import { useRouter } from "expo-router";
import { HStack } from "./ui/hstack";
import { Title } from "./Title";

export const TitleBar = ({
  title,
  ctaText,
  ctaLink,
}: {
  title: string;
  ctaText: string;
  ctaLink?: string;
}) => {
  const router = useRouter();
  return (
    <HStack className="justify-between items-center">
      <Title>{title}</Title>
      {ctaLink && (
        <Pressable onPress={() => router.push(ctaLink)}>
          <Text className="text-primary-500 underline">{ctaText}</Text>
        </Pressable>
      )}
    </HStack>
  );
};
