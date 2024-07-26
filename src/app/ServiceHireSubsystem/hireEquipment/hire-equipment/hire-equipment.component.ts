import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HireItemService } from '../../service/hire-item.service';
import { EquipmentQuotationViewModel, HireItem } from '../../HireItem';

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

  constructor(private fb: FormBuilder, private hireItemService: HireItemService) {}

  ngOnInit(): void {
    this.hireEquipmentForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      equipment: ['', Validators.required]
    });

    this.fetchEquipmentOptions();
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
    if (this.hireEquipmentForm.invalid) {
      return;
    }

    const hireModel: HireItem = {
      hireItemsId: this.hireEquipmentForm.value.hireEquipmentId,
      startDate: this.hireEquipmentForm.value.hireStartDate,
      endDate: this.hireEquipmentForm.value.hireEndDate,
      status: this.hireEquipmentForm.value.status,
      clientId: this.hireEquipmentForm.value.clientId,
      equipmentId: this.hireEquipmentForm.value.equipmentId,
      quotationDate: this.hireEquipmentForm.value.quotationDate
    };

    const quotationModel: EquipmentQuotationViewModel = {
      clientId: this.hireEquipmentForm.value.clientId,
      equipmentId: this.hireEquipmentForm.value.equipmentId,
      quotationDate: this.hireEquipmentForm.value.quotationDate,
      amountPayable: this.hireEquipmentForm.value.amountPayable,
      adminId: this.hireEquipmentForm.value.adminId
    };

    this.hireItemService.createHireItem(hireModel).subscribe(
      (hireResponse) => {
        console.log('Hire Item created:', hireResponse);

        this.hireItemService.createQuotation(quotationModel).subscribe(
          (quotationResponse) => {
            console.log('Quotation requested:', quotationResponse);
            this.showPopupNotification('Quotation request sent successfully');
          },
          (error) => {
            console.error('Error requesting quotation:', error);
            this.showPopupNotification('Failed to request quotation');
          }
        );
      },
      (error) => {
        console.error('Error creating hire item:', error);
        this.showPopupNotification('Failed to create hire item');
      }
    );
  }

  onCancel(): void {
    this.hireEquipmentForm.reset();
  }

  onClose(): void {}

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
