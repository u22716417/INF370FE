import { Component, OnInit } from '@angular/core';
import { Equipment, EquipmentType } from '../equipmentClass';
import { EquipmentServiceService } from '../service/equipment-service.service';
import { Router, RouterLink } from '@angular/router';
import { Config } from 'datatables.net';


@Component({

  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {

  equipments: Equipment[] = [];
  equipmentTypes: EquipmentType[] = [];
  dtOptions: Config = {};
  newEquipment: Equipment = {
    equipmentId: 0,
    equipmentTypeId:0,
    equipmentName: '',
    equipmentDescription: '',
    equipmentAvailability: '',
    equipmentCondition: '',
    equipmentImage: '', // Adjust as needed
    assignments: [], // Adjust as needed
    equipmentType: undefined // Adjust as needed
  };
  showHelpModal = false;  // State for displaying help modal

  constructor(private equipmentService: EquipmentServiceService) { }

  editEquipment: Equipment | null = null;

  
  
    ngOnInit(): void {
    this.loadEquipments();
    this.loadEquipmentTypes();
}

loadEquipments(): void {
  this.equipmentService.getAllEquipments().subscribe(
    (data: Equipment[]) => {
      this.equipments = data;
    },
    (error) => {
      console.error('Error loading equipment:', error);
      alert('Failed to load equipment. Please try again later.');
    }
  );
}

loadEquipmentTypes(): void {
  this.equipmentService.getAllEquipmentTypes().subscribe(
    (data: EquipmentType[]) => {
      this.equipmentTypes = data;
    },
    (error) => {
      console.error('Error loading equipment types:', error);
      alert('Failed to load equipment types. Please try again later.');
    }
  );
}

deleteEquipment(equipmentId: number): void {
  this.equipmentService.deleteEquipment(equipmentId).subscribe(
    () => {
      this.equipments = this.equipments.filter(e => e.equipmentId !== equipmentId);
      alert('Equipment has been removed successfully');
    },
    (error) => {
      console.error('Error removing equipment:', error);
      alert('Failed to remove equipment. Please try again later.');
    }
  );
}


  selectEquipment(equipment: Equipment): void {
    this.editEquipment = { ...equipment };
  }

  getEquipmentTypeDescription(equipmentTypeId: number): string {
    const type = this.equipmentTypes.find(t => t.equipmentTypeId === equipmentTypeId);
    return type ? type.equipmentTypeDescription : 'Unknown'; // Return the description or 'Unknown' if not found
  }

  // Method to open help modal
openHelpModal() {
  this.showHelpModal = true;
}

// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}
}
