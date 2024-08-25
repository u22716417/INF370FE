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
    serviceId: 0, serviceName: '', serviceDescription: '', serviceTypeId: 0,
    assignments: ''
  };
  heading: string = '';

  constructor(
    public router: Router,
    private servicesService: ServicesServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['Id']; // Convert to number
  
      if (id) {
        this.heading = 'Edit Service';
        this.servicesService.getServiceById(id).subscribe(response => {
          console.log(response); // Verify if the service details are fetched correctly
          this.service = response;
        });
      } else {
        this.heading = 'Add Service';
        this.service = { serviceId: 0, serviceName: '', serviceDescription: '', serviceTypeId: 0, assignments: '' };
      }
    });
  }
  
  

  saveService(serviceForm: NgForm): void {
    if (serviceForm.valid) {
      if (this.service.serviceId === 0) {
        // Create new service
        this.servicesService.createService(this.service).subscribe(() => {
          alert('Service has been successfully added');
          this.router.navigate(['/component/service-list']);
        }, error => {
          alert('Create failed: ' + error.message);
        });
      } else {
        // Update existing service
        this.servicesService.updateService(this.service).subscribe(() => {
          alert('Service has been updated successfully ');
          this.router.navigate(['/component/service-list']);
        }, error => {
          alert('Update failed: ' + error.message);
        });
      }
    } else {
      alert('Please fill the required fields');
    }
  }
  
  cancel(): void {
    this.router.navigate(['/component/service-list']);
  }
}


