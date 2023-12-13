import { CategoryDefaultDTO } from "./CategoryDefaultDTO";

export interface SubCategoryDefaultDTO {
    categoryDefault: CategoryDefaultDTO;
    id: number;
    name: string;
}