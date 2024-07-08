import { Component, OnInit } from '@angular/core';
import { Equipment } from '../equipmentClass';
import { EquipmentServiceService } from '../service/equipment-service.service';


@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  equipments: Equipment[] = [];
  newEquipment: Equipment = {
    equipmentId: 0,
    equipmentName: '',
    equipmentDescription: '',
    equipmentAvailability: '',
    equipmentCondition: '',
    equipmentImage: [], // Adjust as needed
    assignments: [], // Adjust as needed
    equipmentType: undefined // Adjust as needed
  };

  constructor(private equipmentService: EquipmentServiceService) { }

  editEquipment: Equipment | null = null;

  
  
    ngOnInit(): void {
    this.loadEquipments();
}

  loadEquipments(): void {
    this.equipmentService.getAllEquipments().subscribe((data: Equipment[]) => {
      this.equipments = data;
    });
  }

  deleteEquipment(equipmentId: number): void {
    this.equipmentService.deleteEquipment(equipmentId).subscribe(() => {
      this.equipments = this.equipments.filter(e => e.equipmentId !== equipmentId);
    });
  }

  selectEquipment(equipment: Equipment): void {
    this.editEquipment = { ...equipment };
  }
}
