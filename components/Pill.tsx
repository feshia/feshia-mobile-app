import { LucideIcon, LucideProps } from "lucide-react-native";
import { ComponentProps, ReactNode } from "react";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { twMerge } from "tailwind-merge";

export const Pill = ({
  text,
  icon,
  iconSize,
  isActive,
}: {
  text: string;
  icon: LucideIcon;
  iconSize: number;
  isActive?: boolean;
}) => {
  const ComponnentIcon = icon;
  return (
    <Box
      className={twMerge(
        "px-4 py-2 bg-background-feshiaGray rounded-lg flex-row items-center gap-2",
        isActive && "bg-primary-500"
      )}
    >
      <Box>
        {isActive ? (
          <ComponnentIcon size={iconSize} color="#fff" />
        ) : (
          <ComponnentIcon size={iconSize} color="#ec268f" />
        )}
      </Box>
      <Text className={twMerge("text-feshia-copy", isActive && "text-white")}>
        {text}
      </Text>
    </Box>
  );
};
