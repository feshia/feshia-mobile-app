export type Tuition = {
  amount: number;
  currency: string;
} | null;

export type UniversityResponse = {
  name: string;
  slug: string;
  description: string;
  city: {
    name: string;
    slug: string;
    country: {
      name: string;
      slug: string;
      code: string;
      region: {
        name: string;
        slug: string;
      };
    };
  };
  location: string;
  website: string;
  email: string;
  logo: string;
  tuition: Tuition;
  international_students: number | null;
  rank: number | null;
  scholarship: boolean;
  size: string | null;
  ownership: string | null;
  general_requirements: Record<
    string,
    {
      title: string;
      value: string;
    }[]
  >;
  gallery: string[];
};

export type UniversityCardProps = {
  slug: string;
  name: string;
  location: string;
  qsRank?: number;
  scholarship?: string;
  internationalStudents?: number;
  image: any;
  size?: "sm" | "lg";
};

export type ArticleResponse = {
    title: string;
    created_at: string;
    categories: {name: string}[];
    slug: string;
    feature_image: string;
    content: string;
};

export type ProgramTypeResponse = {
  name: string;
  slug: string;
};

export type StudyAreaResponse = {
  name: string;
  slug: string;
};

export type ProgramResponse = {
  name: string;
  slug: string;
  duration: string | null;
  tuition: Tuition;
  scholarship: boolean;
  course_intensity: string | null;
  program_attributes: Record<string, string>;
  program_type: ProgramTypeResponse;
  study_area: StudyAreaResponse;
  university?: UniversityResponse;
};