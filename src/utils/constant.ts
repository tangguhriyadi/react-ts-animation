import { CollectionData } from "../pages/collection/types";
import { SyntheticEvent } from "react";
interface DeleteProps {
    data: CollectionData[];
    collectionId: string | undefined;
    animeId: number;
}
interface DeleteCollectionProps {
    data: CollectionData[];
    collectionId: string | null;
}

export const saveToLocalStorage = (data: CollectionData): void => {
    const existingStorage: string | null = localStorage.getItem("collection");
    const parsedLocalStorage = existingStorage
        ? JSON.parse(existingStorage)
        : [];
    let array: CollectionData[] = [];
    if (parsedLocalStorage.length === 0) {
        data.data = [];
        array.push(data);
        localStorage.setItem("collection", JSON.stringify(array));
    } else {
        array.push(...parsedLocalStorage);
        data.data = [];
        array.push(data);
        localStorage.setItem("collection", JSON.stringify(array));
    }
};

export const deleteMutationCollectionLocal = (
    props: DeleteCollectionProps
): void => {
    const { data, collectionId } = props;

    const updatedData = data.filter(
        (d: CollectionData) => d.title != collectionId
    );

    localStorage.setItem("collection", JSON.stringify(updatedData));
};

export const deleteMutationLocal = (props: DeleteProps): void => {
    const { data, collectionId, animeId } = props;

    const updatedData = data.map((item) => {
        if (item.title === collectionId) {
            const dataPersist = item.data ? item.data : [];
            const filteredData = dataPersist.filter(
                (obj) => obj.id !== animeId
            );
            return { ...item, data: filteredData };
        }
        return item;
    });

    localStorage.setItem("collection", JSON.stringify(updatedData));
};

export const convertNumber = (month: number | undefined): string => {
    if (!month) return "0";
    if (month >= 10) return month.toString();
    return `0${month}`;
};

export const getDataLocalStorage = () => {
    const existingStorage: string | null = localStorage.getItem("collection");

    const parsedLocalStorage: CollectionData[] = existingStorage
        ? JSON.parse(existingStorage)
        : [];

    return parsedLocalStorage;
};

export const getCollectionByAnimeName = (id?: number) => {
    const collection: CollectionData[] = getDataLocalStorage();

    const filteredData = collection.filter((item) => {
        if (item.data) {
            return item.data.some((media) => media.id === id);
        }
        return false;
    });

    return filteredData;
};

export const getCollectionByName = (id?: string | null):CollectionData => {
    const collection: CollectionData[] = getDataLocalStorage();

    return collection.filter((item) => item.title === id)[0]
};

export const handleImageError = (
    e: SyntheticEvent<HTMLImageElement, Event>
) => {
    const target = e.target as HTMLImageElement;
    target.src = "../../assets/default.png";
};
export const handleImageBannerError = (
    e: SyntheticEvent<HTMLImageElement, Event>
) => {
    const target = e.target as HTMLImageElement;
    target.src = "../../assets/defaultBanner.png";
};

export const title = (data: any): string => {
    if (data.english) {
        return data.english;
    } else if (data.romaji) {
        return data.romaji;
    } else if (data.native) {
        return data.native;
    } else return "untitled";
};

export const stripTags = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
};

export const editCollectionMutation = (
    data: CollectionData,
    id?: string | null
): void => {
    const collection: CollectionData[] = getDataLocalStorage();
    const editedData = collection.map((col) => {
        if (col.title === id) {
            return {
                ...col,
                title: data.title,
                description: data.description,
            };
        }
        return col;
    });

    localStorage.setItem("collection", JSON.stringify(editedData));
};
