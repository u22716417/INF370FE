import { Component, OnInit } from '@angular/core';
import { Service } from '../service';
import { ServicesServiceService } from '../service/services-service.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  dtOptions: Config = {};

  filteredService: Service[] = [];
  searchTerm: string = '';
  showHelpModal = false;  // State for displaying help modal
  isEditMode: boolean = false;  // To track if we are in edit mode or add mode
  newService: Service = { id: 0, serviceName: '', serviceDescription: '' }; // For adding or editing a service
  showNotification: boolean = false;
  notificationMessage: string = '';
  constructor(private serviceService: ServicesServiceService) {}

  ngOnInit(): void {
    this.getAllServices();
    
  }

  

  // Fetch all services
  getAllServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (result) => {
        this.services = result;
        this.filteredService = [...this.services];
        console.log('Fetched services:', this.services);
      },
      error: (err) => {
        console.error('There are no services available', err);
      }
    });
  }

  


  // Reset form and exit edit mode
  resetForm(): void {
    this.newService = { id: 0, serviceName: '', serviceDescription: '' };
    this.isEditMode = false;
  }

  // Delete service by ID
  deleteById(serviceId: number): void {
    console.log('Deleting service with ID:', serviceId);
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete) {
      this.serviceService.deleteServiceById(serviceId).subscribe({
        next: () => {
          console.log('Service has been deleted successfully');
          this.loadServices();
        },
        error: (err) => {
          this.showPopupNotification('Delete failed: ' + err.message);
        }
      });
    }
  }

  // Load services again after update or delete
  loadServices(): void {
    this.getAllServices();
  }

  // Filter services by search term
  filterServices(): void {
    console.log('Filtering services with term:', this.searchTerm);
    if (this.searchTerm.length <= 2) {
      this.filteredService = [...this.services];
    } else {
      this.filteredService = this.services.filter(value =>
        value.serviceName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Method to open help modal
  openHelpModal() {
    this.showHelpModal = true;
  }

  // Method to close help modal
  closeHelpModal() {
    this.showHelpModal = false;
  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
  }
}
