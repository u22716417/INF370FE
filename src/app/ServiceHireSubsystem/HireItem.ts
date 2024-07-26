
export interface HireItem {
    hireItemsId: number;
    startDate: Date;
    endDate: Date;
    status: string;
    clientId: number;
    equipmentId: number;
    quotationDate: Date;
  }

  export interface EquipmentQuotationViewModel {
    clientId: string;
    equipmentId: string;
    quotationDate: Date;
    amountPayable: number;
    adminId: string;
  }
  