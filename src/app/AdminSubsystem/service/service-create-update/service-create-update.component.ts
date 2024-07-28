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
    private router: Router,
    private servicesService: ServicesServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Use 'id' from route params

      if (id > 0) {
        this.heading = 'Edit Service';
        this.servicesService.getServiceById(id).subscribe(response => this.service = response);
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
          alert('Service successfully added');
          this.router.navigate(['/component/service-list']);
        }, error => {
          alert('Create failed: ' + error.message);
        });
      } else {
        // Update existing service
        this.servicesService.updateService(this.service).subscribe(() => {
          alert('Service successfully updated');
          this.router.navigate(['/services']);
        }, error => {
          alert('Update failed: ' + error.message);
        });
      }
    } else {
      alert('Please fill all the fields');
    }
  }

  cancel(): void {
    this.router.navigate(['/services']);
  }
}


