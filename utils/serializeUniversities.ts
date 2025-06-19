import {UniversityCardProps, UniversityResponse} from "../constants/types";

export const serializeUniversities = (universities: UniversityResponse[]) => {
     return universities.reduce((items, item) => {
        if (item.gallery.length === 0) {
          return items;
        }
        const validImage =
          item.gallery.length > 0 &&
          item.gallery[0] &&
          (item.gallery[0].endsWith(".jpeg") ||
            item.gallery[0].endsWith(".jpg") ||
            item.gallery[0].endsWith(".png"));

        if (!validImage) {
          return items;
        }
        items.push({
          slug: item.slug,
          name: item.name,
          location: `${item.city.name} ${item.city.country.name}`,
          qsRank: item.rank || undefined,
          internationalStudents: item.international_students || undefined,
          image: item.gallery[0],
        });
        return items;
      }, [] as UniversityCardProps[]);
}