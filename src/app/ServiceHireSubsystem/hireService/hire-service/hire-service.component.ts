import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HireServiceService } from '../../hireService-service/hire-service.service';
import { HireServiceViewModel } from '../../HireService';

@Component({
  selector: 'app-hire-service',
  templateUrl: './hire-service.component.html',
  styleUrls: ['./hire-service.component.scss']
})
export class HireServiceComponent implements OnInit{
  hireServiceForm!: FormGroup;
  serviceOptions: string[] = [];
  showNotification: boolean = false;
  notificationMessage: string = '';

  

  constructor(private fb: FormBuilder, private hireServiceService: HireServiceService) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchServiceOptions();
  }

  initializeForm(): void {
    this.hireServiceForm = this.fb.group({
      ServiceId: ['', Validators.required],
      DateId: ['', Validators.required],
      TimeslotId: ['', Validators.required],
      TimeslotDescription: ['', Validators.required]
    });
  }

  fetchServiceOptions(): void {
    this.hireServiceService.getServiceOptions().subscribe(
      (options: string[]) => {
        this.serviceOptions = options;
        console.log('Service options:', this.serviceOptions);
      },
      error => {
        console.error('Error fetching equipment options', error);
      }
    );
  }

  onSubmit(): void {
    if (this.hireServiceForm.valid) {
      const formValue = this.hireServiceForm.value;
      const hireService: HireServiceViewModel = {
        ServiceId: formValue.serviceId,
        TimeslotId: formValue.TimeslotId,
        ServiceTimeslotDescription: formValue.ServiceTimeslotDescription,
        HireServiceId: 0,
        DateId: 0
      };

      this.hireServiceService.createHireQuotation(hireService).subscribe(
        () => {
          console.log(this.hireServiceService);
          this.notificationMessage = 'Quotation request sent successfully!';
          this.showNotification = true;
          this.hireServiceForm.reset();
        },
        error => this.handleError('Failed to send quotation request.')
      );
    }
  }

  onCancel(): void {
    this.hireServiceForm.reset();
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
