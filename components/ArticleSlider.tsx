import { useRouter } from "expo-router";
import { Pressable, ScrollView, Image } from "react-native";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { ArticleCard, ArticleCardProps } from "./ArticleCard";

export const ArticleSlider = ({
  articles,
}: {
  articles: ArticleCardProps[];
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 8,
        columnGap: 12,
      }}
    >
      {articles.map((article) => (
        <Box style={{ width: 280 }} key={article.slug}>
          <ArticleCard {...article} />
        </Box>
      ))}
    </ScrollView>
  );
};

// export const ArticleCard = ({ title, slug, image, date }: ArticleCardProps) => {
//   const router = useRouter();
//   return (
//     <Pressable key={slug} onPress={() => router.navigate(`/article/${slug}`)}>
//       <Box
//         style={{
//           borderRadius: 12,
//           borderColor: "rgba(17, 17, 19, 0.25)",
//           borderWidth: 0.5,
//           backgroundColor: "#ffffff",
//         }}
//       >
//         <Box className="pb-2">
//           <Image
//             source={image}
//             style={{
//               width: "100%",
//               height: 140,
//               borderTopLeftRadius: 8,
//               borderTopRightRadius: 8,
//               borderBottomLeftRadius: 0,
//               borderBottomRightRadius: 0,
//             }}
//             resizeMode="cover"
//           />
//         </Box>

//         <Box className="px-3 py-3">
//           <Text numberOfLines={2} className="font-title ">
//             {title}
//           </Text>
//           <Text className="text-xs text-feshia-copy pt-2">{date}</Text>
//         </Box>
//       </Box>
//     </Pressable>
//   );
// };

// type ArticleCardProps = {
//   slug: string;
//   title: string;
//   image: any;
//   date: string;
// };
