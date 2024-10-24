export interface ServiceSchedule {
    ServiceId: number;
    TimeslotId: number;
    DateId: number;
    TimeslotDescription: string;
  
  }
  export interface EquipmentSchedule {
    EquipmentId: number;
    TimeslotId: number;
    DateId: number;
    TimeslotDescription: string;
  
  }

export interface HireServiceViewModel{
HireServiceId: number;
ServiceId: number;
DateId: number;
TimeslotId: number;
ServiceTimeslotDescription: string;

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
