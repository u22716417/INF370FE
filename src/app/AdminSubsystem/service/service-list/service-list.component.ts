import { Component, OnInit } from '@angular/core';
import { Service } from '../service';
import { ServicesServiceService } from '../service/services-service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  filteredService: Service[] = [];
  searchTerm: string = '';

  constructor(private serviceService: ServicesServiceService) {}

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (result) => {
        this.services = result;
        this.filteredService = [...this.services];
        console.log('Fetched services:', this.services);
      },
      error: (err) => {
        console.error('Error fetching services', err);
      }
    });
  }

  loadServices(): void {
    this.getAllServices();
  }

  deleteById(serviceId: number): void {
    console.log('Deleting service with ID:', serviceId);
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete) {
      this.serviceService.deleteServiceById(serviceId).subscribe({
        next: () => {
          console.log('Service deleted successfully');
          this.loadServices();
        },
        error: (err) => {
          alert('Delete failed: ' + err.message);
        }
      });
    }
  }

  logId(serviceId: number): void {
    console.log('Editing service with ID:', serviceId);
  }

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
}

