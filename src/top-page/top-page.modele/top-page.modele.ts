export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export class TopPageModele {
    firstLevelCategory: TopLevelCategory;
    secondLevelCategory: string;
    title: string;
    category: string;
    hh?: {
        count: number;
        juniorSalary: number;
        middleSalary: number;
        seniorSalary: number;
    }
    advantages: {
        title: string;
        description: string;
    }[];
    seoText: string;
    tags: string[];
}
