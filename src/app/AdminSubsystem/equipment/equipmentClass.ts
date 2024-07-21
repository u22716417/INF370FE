export interface Equipment {
    equipmentId: number;
    equipmentTypeId: number;
    equipmentName: string;
    equipmentDescription: string;
    equipmentAvailability: string;
    equipmentCondition: string;
    equipmentImage: string;
    assignments: Assignment[];
    equipmentType?: EquipmentType;
}

export class EquipmentType {
    equipmentTypeId: number;
    equipmentTypeDescription: string;
    chargeRate: number;
    constructor(equipmentTypeId: number, equipmentTypeDescription: string,chargeRate: number) {
      this.equipmentTypeId = equipmentTypeId;
      this.equipmentTypeDescription = equipmentTypeDescription;
      this.chargeRate = chargeRate
    }
  }



export interface Assignment {
    // Define the structure of the Assignment interface here
    // Example:
    // assignmentId: number;
    // otherProperty: string;
}

export interface EquipmentType {
    // Define the structure of the EquipmentType interface here
    // Example:
    // equipmentTypeId: number;
    // typeName: string;
}
