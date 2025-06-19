import { ArticleCardProps } from "@/components/ArticleCard";
import { ArticleResponse } from "@/constants/types";

export const serializeArticles = (articles: ArticleResponse[], layout: ArticleCardProps['layout']): ArticleCardProps[] => {
  return articles.reduce((items, item) => {
    if (!item.feature_image || !item.slug || !item.title) {
      return items;
    }
    items.push({
      slug: item.slug,
      title: item.title,
      type: item.categories[0].name,
      image: item.feature_image,
      createdAt: item.created_at,
      layout: layout || "horizontal",
    });
    return items;
  }, [] as ArticleCardProps[]);
}