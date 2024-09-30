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


  constructor(public router: Router, private equipmentService: EquipmentServiceService, private route: ActivatedRoute) { }

  cancel() {
    console.log('Cancel button clicked');
    this.router.navigate(['/component/equipment-list']);
  }
>>>>>>> 8f8a14be3e5a5d8479e9aa448b39e3d9620048b3

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
<<<<<<< HEAD
    this.equipmentService.getEquipmentTypes().subscribe(
      (response: EquipmentType[]) => {
        this.equipmentTypes = response;
      },
      (error) => {
        console.error('Error fetching equipment types:', error);
=======
    this.equipmentService.getAllEquipmentTypes().subscribe((response: EquipmentType[]) => {
      this.equipmentTypes = response;
    });
  }

  addEquipment(equipmentForm: NgForm): void {
    if (equipmentForm.valid) {
      if (this.newEquipment.equipmentId === 0) {
        this.equipmentService.createEquipment(this.newEquipment).subscribe(
          (response: any) => {
            if (response != null) {
              this.showPopupNotification('Equipment has been added successfully');
              this.router.navigate(['/component/equipment-list']);
            } else {
              this.router.navigate(['/component/equipment-list']);
            }
          },
          (error) => {
            console.error('Error adding equipment:', error);
          }
        );
      } else {
        this.equipmentService.updateEquipment(this.newEquipment.equipmentId, this.newEquipment).subscribe(
          (response: any) => {
            if (response != null) {
             
              this.router.navigate(['/component/equipment-list']);
              this.showPopupNotification('Equipment has been updated successfully');
            } else {
              this.router.navigate(['/component/equipment-list']);
            }
          },
          (error) => {
            console.error('Error updating equipment:', error);
          }
        );
>>>>>>> 8f8a14be3e5a5d8479e9aa448b39e3d9620048b3
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
      alert('Please fill all the fields');
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

<<<<<<< HEAD
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
=======
// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}
  
}
