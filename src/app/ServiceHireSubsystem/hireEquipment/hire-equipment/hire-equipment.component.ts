import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HireItemService } from '../../service/hire-item.service';
import { HireEquipmentViewModel } from '../../HireItem';


@Component({
  selector: 'app-hire-equipment',
  templateUrl: './hire-equipment.component.html',
  styleUrls: ['./hire-equipment.component.scss']
})
export class HireEquipmentComponent implements OnInit {
  hireEquipmentForm!: FormGroup;
  equipmentOptions: string[] = [];
  showNotification: boolean = false;
  notificationMessage: string = '';

  

  constructor(private fb: FormBuilder, private hireItemService: HireItemService) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchEquipmentOptions();
  }

  initializeForm(): void {
    this.hireEquipmentForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      equipment: ['', Validators.required]
    });
  }

  fetchEquipmentOptions(): void {
    this.hireItemService.getEquipmentOptions().subscribe(
      (options: string[]) => {
        this.equipmentOptions = options;
        console.log('Equipment options:', this.equipmentOptions);
      },
      error => {
        console.error('Error fetching equipment options', error);
      }
    );
  }

  onSubmit(): void {
    if (this.hireEquipmentForm.valid) {
      const formValue = this.hireEquipmentForm.value;
      const hireRequest: HireEquipmentViewModel = {
        HireEquipmentId: 0, 
        EquipmentId: formValue.equipment,
        ClientId: parseInt(sessionStorage.getItem('CurrentUserId') || '0', 10),
        HireStartDate: formValue.startDate,
        HireEndDate: formValue.endDate,
        Status: 'Pending',
        AdminId: 2
      };

      this.hireItemService.createHireQuotation(hireRequest).subscribe(
        () => {
          console.log(this.hireItemService);
          this.notificationMessage = 'Quotation request sent successfully!';
          this.showNotification = true;
          this.hireEquipmentForm.reset();
        },
        error => this.handleError('Failed to send quotation request.')
      );
    }
  }

  onCancel(): void {
    this.hireEquipmentForm.reset();
  }

  onClose(): void {
    this.showNotification = false;
  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  private handleError(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
  }
}
