import { SubCategoryDTO } from "./SubCategoryDTO";

export default interface TransactionDTO {
  id: string;
  accountId: string;
  subCategoryDTO: SubCategoryDTO;
  totalValue: number;
  description: string;
  effectiveDate: Date;
}
