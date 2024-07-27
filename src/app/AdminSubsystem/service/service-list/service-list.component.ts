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
  isPopupVisible: boolean = false;

  constructor(private serviceService: ServicesServiceService) {}

  ngOnInit(): void {
    this.getAllServices();
    console.log(this.services);
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe(result => {
      this.services = result;
      this.filteredService = [...this.services];
    });
  }

  loadServices() {
    this.getAllServices(); // Use getAllServices to refresh the service list
  }

  deleteById(serviceId: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete) {
      this.serviceService.deleteServiceById(serviceId).subscribe({
        next: () => {
          this.loadServices(); // Refresh the list of services after deletion
        },
        error: () => {
          alert('Delete failed');
        }
      });
    }
  }

  filterServices() {
    if (this.searchTerm.length <= 2) {
      this.filteredService = [];
    } else {
      this.filteredService = this.services.filter(value =>
        value.serviceName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}

