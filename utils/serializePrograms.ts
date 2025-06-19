import { ProgramCardProps } from "@/components/ProgramCard";
import { ProgramResponse } from "@/constants/types";

export enum universityPageSections {
    GENERAL_REQUIREMENTS = "general-entry-req",
    AVAILABLE_PROGRAMS = "available-programs",
    BASIC_INFO = "basic-info",
    ABOUT = "about",
}

export const serializePrograms = (programs: ProgramResponse[]): ProgramCardProps[] => {
  return programs.reduce((items, item) => {
    if (!item.name || !item.slug || !item.university?.gallery || !item.university.gallery[0]) {
      return items;
    }

    const slug = `${item.university.slug}#${universityPageSections.AVAILABLE_PROGRAMS}_${item.program_type.name}_${item.slug}`;

    items.push({
      slug,
      name: item.name,
      tuition: item.tuition?.amount ? `${item.tuition.amount} ${item.tuition.currency}` : undefined,
      duration: item.duration || undefined,
      scholarship: item.scholarship ? "Available" : "Not Available",
      image: item.university.gallery[0],
    });
    return items;
  }, [] as ProgramCardProps[]);
}