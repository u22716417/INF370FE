import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { EquipmentService } from '../service/equipment-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments: any[] = [];  // Changed to 'any[]'
  showHelpModal: boolean = false;
  dtOptions: Config = {};
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(private equipmentService: EquipmentService, private router:Router) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.equipmentService.getEquipments().subscribe(
      (data: any[]) => {  // Expect 'any[]' data
        this.equipments = data;
        console.log('Equipment fetched: ', this.equipments);  
      },
      (error) => {
        console.error('Error fetching equipment:', error);
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  editEquipment(equipmentId: number): void {
    console.log('Editing equipment with ID:', equipmentId);  // Add this line for debugging
    if (equipmentId) {
      this.router.navigate(['/equipment-create-update', equipmentId]);
    } else {
      console.error('ID is undefined or null');
    }
  }
  


  deleteEquipment(id: number): void {
    if (confirm('Are you sure you want to delete this equipment?')) {
      this.equipmentService.deleteEquipment(id).subscribe({
        next: () => {
          this.loadEquipments(); // Reload the equipment list after deletion
        },
        error: (err) => {
          console.error('Error deleting equipment', err);
        }
      });
    }
  }

  openHelpModal() {
    this.showHelpModal = true;
  }

  closeHelpModal() {
    this.showHelpModal = false;
  }

  showNotificationMessage(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
  
    // Optionally hide the notification after a few seconds
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);  // 3 seconds
  }
}
