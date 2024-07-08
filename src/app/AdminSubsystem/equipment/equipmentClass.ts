export interface Equipment {
    equipmentId: number;
    equipmentTypeId?: number;
    equipmentName: string;
    equipmentDescription: string;
    equipmentAvailability: string;
    equipmentCondition: string;
    equipmentImage: Uint8Array | Array<number> ;
    assignments: Assignment[];
    equipmentType?: EquipmentType;
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
