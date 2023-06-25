export interface Anime {
    id: string;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    coverImage: {
        medium: string;
        large: string;
    };
    episodes: number;
    format: string;
    type: string;
    siteUrl: string;
    isLicensed: boolean;
    description?: string;
    bannerImage?: string;
    meanScore?: number;
    popularity?: number;
    trending?: number;
    favourites?: number;
    isAdult: boolean;
    startDate?: {
        year: number;
        month: number;
        day: number;
    };
    endDate?: {
        year: number;
        month: number;
        day: number;
    };
}

export interface PageInfo {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
}

export interface Response {
    Page: {
        media: Anime[];
        pageInfo: PageInfo;
    };
}

export interface ItemPaginate {
    id: number;
    title: string;
}
