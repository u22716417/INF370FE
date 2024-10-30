export interface ExistingEquipmentResponse {
   existingEquipment:{
     equipments: 
    { 
        equipment: string[]; 
        termStart: string; 
        termEnd: string; 
    }[];
};
    
    message: string; 
}
