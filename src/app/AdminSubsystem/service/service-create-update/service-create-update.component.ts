import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServicesServiceService } from '../service/services-service.service';
import { Service } from '../service';

@Component({
  selector: 'app-service-create-update',
  templateUrl: './service-create-update.component.html',
  styleUrls: ['./service-create-update.component.css']
})
export class ServiceCreateUpdateComponent implements OnInit {

  service: Service = {
    id: 0, 
    serviceName: '', 
    serviceDescription: ''
  };
  heading: string = '';
  showHelpModal = false;  // State for displaying help modal
  showNotification: boolean = false;
  notificationMessage: string = '';
  constructor(
    public router: Router,
    private servicesService: ServicesServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      console.log('Service ID from URL:', id); // Add this line for debugging
      
      if (id) {
        this.heading = 'Edit Service';
        this.servicesService.getServiceById(id).subscribe(response => {
          console.log('Full Response:', response); // Log the entire response object
          this.service = response;
          console.log('Editing Service ID:', this.service.id); 
        });
        
      } else {
        this.heading = 'Add Service';
        this.service = { id: 0, serviceName: '', serviceDescription: '' };
      }
    });
  }
  

  saveService(serviceForm: NgForm): void {
    if (serviceForm.valid) {
        if (this.service.id === 0) {
            // Create new service
            this.servicesService.createService(this.service).subscribe(
                (createdService) => {
                    this.showPopupNotification('Service has been successfully added');
                    this.router.navigate(['/component/service-list']);
                },
                (error) => {
                    this.showPopupNotification('Create failed: ' + error.message);
                }
            );
        } else {
            // Update existing service
            console.log('Updating Service ID:', this.service.id); // Check if this ID is correct
            this.servicesService.updateService(this.service.id, this.service).subscribe(
                () => {
                    this.showPopupNotification('Service has been updated successfully');
                    this.router.navigate(['/component/service-list']);
                },
                (error) => {
                    this.showPopupNotification('Update failed: ' + error.message);
                }
            );
        }
    } else {
        this.showPopupNotification('Please fill the required fields');
    }
}

  

  cancel(): void {
    this.router.navigate(['/component/service-list']);
  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
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
