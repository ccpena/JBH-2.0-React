import { SubCategoryDefaultDTO } from "./SubCategoryDefaultDTO";

export interface SubCategoryDTO {
    categoryId: string;
    name: string;
    subCategoryDefault: SubCategoryDefaultDTO;
}