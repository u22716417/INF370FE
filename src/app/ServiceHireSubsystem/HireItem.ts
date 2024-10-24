
export interface HireItem {
    hireItemsId: number;
    startDate: string;
    endDate: string;
    status: string;
    clientId: number;
    equipmentId: number;
  
  }

export interface HireEquipmentViewModel{
HireEquipmentId: number;
EquipmentId: number;
ClientId: number;
HireStartDate: Date;
HireEndDate: Date;
Status: string;
AdminId: 2;


}

export class Quotation {
  quotationId: number;
  clientId?: number;
  equipmentId?: number;
  serviceId?: number;
  amountPayable: number;
  quotationDate: Date;

  constructor(
    quotationId: number,
    amountPayable: number,
    quotationDate: Date,
    clientId?: number,
    equipmentId?: number,
    serviceId?: number,

  ) {
    this.quotationId = quotationId;
    this.clientId = clientId;
    this.equipmentId = equipmentId;
    this.serviceId = serviceId;
    this.amountPayable = amountPayable;
    this.quotationDate = quotationDate;
  }
}
