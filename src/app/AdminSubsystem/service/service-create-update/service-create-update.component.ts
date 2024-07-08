import { Component } from '@angular/core';
import { Service } from '../service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesServiceService } from '../service/services-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-service-create-update',
  templateUrl: './service-create-update.component.html',
  styleUrl: './service-create-update.component.css'
})
export class ServiceCreateUpdateComponent {


  services: Service = {serviceId: 0, serviceName: '', serviceDescription: '', serviceTypeId: 0, assignments: ''}
  
  isSubmitted:boolean = false;

  heading: string = '';


  constructor(private router: Router, private serviceService:ServicesServiceService, private route: ActivatedRoute){}

  cancel() {
    this.router.navigate(['/services']);

  }

  ngOnInit(): void {
    this.services = { serviceId: 0, serviceName: '',serviceDescription: '', serviceTypeId: 0, assignments: ''};
    this.route.params.subscribe(params =>{
      const id = parseInt(params['Id']);

      if(id > 0) 
      {

        this.heading = 'Edit Venue';
        this.serviceService.getServiceById(id)
        .subscribe(response => this.services = response)
      }
      else
      {
        this.heading = 'Add Service'
      }
    
  })
  }

  addService(serviceForm:NgForm){
    if (this.services.serviceName != '' && this.services.serviceDescription != '' && this.services.serviceTypeId)
    {
      if (this.services.serviceId === 0)
        {
          this.serviceService.createService(this.services)
          .subscribe(response => {
            if(response != null)
              {
                this.router.navigate(['/services']);
              }
              else
              {
                alert('Create failed');
              }
        })
        }
        else
        {
          alert('Update failed');
        }
    }
    else
      {
       alert('Please fill all the fields');
      }
  }

  
  
}
