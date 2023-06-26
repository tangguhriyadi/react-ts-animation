import * as yup from "yup";
import { FormValues } from "../pages/collection/types";


const notDuplicatTitle = (value: string) => {
    const existingStorage: string | null = localStorage.getItem("collection");
    const parsedLocalStorage = existingStorage
        ? JSON.parse(existingStorage)
        : [];
    const isExist: boolean = parsedLocalStorage.some(
        (data: FormValues) => data.title === value
    );
    if (isExist) {
        return false;
    }
    return true;
};

export const schema = yup
    .object({
        title: yup
            .string()
            .required()
            .test("is-valid", "Title already exist", notDuplicatTitle),
        description: yup.string().required(),
    })
    .required();