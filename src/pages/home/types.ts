export interface Anime {
    id: string;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    coverImage: {
        medium: string;
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
