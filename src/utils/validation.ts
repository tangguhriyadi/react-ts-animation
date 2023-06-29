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
            .test("is-valid", "Title already exist", notDuplicatTitle)
            .matches(/^[a-zA-Z0-9\s]+$/, 'Special character is not allowed'),
        description: yup.string().required(),
    })
    .required();

export const schemaEdit = yup
    .object({
        title: yup
            .string()
            .required()
            .matches(/^[a-zA-Z0-9\s]+$/, 'Special character is not allowed'),
        description: yup.string().required(),
    })
    .required();