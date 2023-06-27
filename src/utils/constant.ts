import { CollectionData } from "../pages/collection/types";
interface DeleteProps {
    data: CollectionData[];
    collectionId: string | undefined;
    animeId: number;
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
