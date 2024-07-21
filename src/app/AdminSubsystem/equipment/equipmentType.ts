export class EquipmentType {
    equipmentTypeId: number;
    equipmentTypeDescription: string;
    chargeRate: number;
  
    constructor(equipmentTypeId: number, equipmentTypeDescription: string,chargeRate: number) {
      this.equipmentTypeId = equipmentTypeId;
      this.equipmentTypeDescription = equipmentTypeDescription;
      this.chargeRate= chargeRate;
    }
  }