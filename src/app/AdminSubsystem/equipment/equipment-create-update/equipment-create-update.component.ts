import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EquipmentServiceService } from '../service/equipment-service.service'; // Adjust the path as needed
import { Equipment } from '../equipmentClass';

@Component({
  selector: 'app-equipment-create-update',
  templateUrl: './equipment-create-update.component.html',
  styleUrls: ['./equipment-create-update.component.css']
})
export class EquipmentCreateUpdateComponent {

  newEquipment: Equipment = { 
    equipmentId: 0, 
    equipmentName: '', 
    equipmentDescription: '', 
    equipmentAvailability: '', 
    equipmentCondition: '', 
    equipmentImage:'', 
    assignments: [], 
    equipmentType: undefined
  };
  fileNameUploaded = '';
  formData = new FormData();
  isSubmitted: boolean = false;
  heading: string = '';

  constructor(public router: Router, private equipmentService: EquipmentServiceService, private route: ActivatedRoute) { }

  cancel() {
    console.log('Cancel button clicked');
    this.router.navigate(['/component/equipment-list']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['Id']);

      if (id > 0) {
        this.heading = 'Edit Equipment';
        this.equipmentService.getEquipmentById(id).subscribe((response: any) => {
          this.newEquipment = response;
        });
      } else {
        this.heading = 'Add Equipment';
      }
    });
  }

  addEquipment(equipmentForm: NgForm) {
    if (equipmentForm.valid) {
      if (this.newEquipment.equipmentId === 0) {
        this.equipmentService.createEquipment(this.newEquipment).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/equipment']);
          } else {
            this.router.navigate(['/equipment']);
          }
        });
      } else {
        this.equipmentService.updateEquipment(this.newEquipment.equipmentId, this.newEquipment).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/equipment']);
          } else {
            this.router.navigate(['/equipment']);
          }
        });
      }
    } else {
      alert('Please fill all the fields');
    }
  }
 
  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    let fileToUpload = input.files[0];
    this.fileNameUploaded = fileToUpload.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.newEquipment.equipmentImage = reader.result as string;
    };
    reader.readAsDataURL(fileToUpload);
  }
  
  
  
}
