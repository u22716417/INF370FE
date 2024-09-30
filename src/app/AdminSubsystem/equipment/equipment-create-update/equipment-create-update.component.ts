import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Equipment } from '../equipmentClass';
import { EquipmentType } from '../equipmentType';
import { EquipmentService } from '../service/equipment-service.service';

@Component({
  selector: 'app-equipment-create-update',
  templateUrl: './equipment-create-update.component.html',
  styleUrls: ['./equipment-create-update.component.css']
})
export class EquipmentCreateUpdateComponent implements OnInit {
  
  newEquipment: Equipment = {
    equipment_ID: 0,
    equipment_Type_ID: 0,
    name: '',
    description: '',
    availability: 'True',
    condition: '',
    image: ''
  };
  
  fileNameUploaded = '';
  isSubmitted: boolean = false;
  heading: string = '';
  equipmentTypes: EquipmentType[] = [];
  showHelpModal = false;  // State for displaying help modal
  notificationMessage: string = '';
  showNotification: boolean = false;

  constructor(
    public router: Router,
    private equipmentService: EquipmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10);  // Use 'id' to match the new route param
  
      if (id > 0) {
        this.heading = 'Edit Equipment';
        this.equipmentService.getEquipmentById(id).subscribe(
          (response: Equipment) => {
            this.newEquipment = response;
          },
          (error) => {
            console.error('Error fetching equipment by ID:', error);
          }
        );
      } else {
        this.heading = 'Add Equipment';
      }
    });

    // Fetch equipment types
    this.equipmentService.getEquipmentTypes().subscribe(
      (response: EquipmentType[]) => {
        this.equipmentTypes = response;
      },
      (error) => {
        console.error('Error fetching equipment types:', error);
      }
    );
}


  // Add or Update Equipment
// Add or Update Equipment
addOrUpdateEquipment(equipmentForm: NgForm): void {
  if (equipmentForm.valid) {
    if (this.newEquipment.equipment_ID === 0) {
      // Adding new equipment
      this.equipmentService.addEquipment(this.newEquipment as any).subscribe(
        (response: any) => {
          alert('Equipment added successfully.');
          this.router.navigate(['/component/equipment-list']);
        },
        (error) => {
          console.error('Error adding equipment:', error);
        }
      );
    } else {
      // Updating existing equipment
      this.equipmentService.updateEquipment(this.newEquipment.equipment_ID, this.newEquipment as any).subscribe(
        () => {
          alert('Equipment updated successfully.');
          this.router.navigate(['/component/equipment-list']);
        },
        (error) => {
          console.error('Error updating equipment:', error);
        }
      );
    }
  } else {
    alert('Please fill all the required fields.');
  }
}



  // Handle file upload for equipment image
  uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    let fileToUpload = input.files[0];
    this.fileNameUploaded = fileToUpload.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.newEquipment.image = reader.result as string;
    };
    reader.readAsDataURL(fileToUpload);
  }

  // Cancel button to navigate back to the equipment list
  cancel(): void {
    this.router.navigate(['/component/equipment-list']);
  }

  // Method to open help modal
  openHelpModal(): void {
    this.showHelpModal = true;
  }

  // Method to close help modal
  closeHelpModal(): void {
    this.showHelpModal = false;
  }
}

