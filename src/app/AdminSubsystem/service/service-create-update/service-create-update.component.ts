import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  apiUrl: string = 'https://localhost:7149/api/Services'; 

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Use 'id' from route params
      
      if (id > 0) {
        this.heading = 'Edit Service';
        this.http.get<Service>(`${this.apiUrl}/${id}`).subscribe(response => this.service = response);
      } else {
        this.heading = 'Add Service';
        this.service = { serviceId: 0, serviceName: '', serviceDescription: '', serviceTypeId:0 };
      }
    });
  }

  saveService(serviceForm: NgForm) {
    if (serviceForm.valid) {
      if (this.service.serviceId === 0) {
        // Create new service
        this.http.post(this.apiUrl, this.service, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).subscribe(response => {
          this.router.navigate(['/services']);
        }, error => {
          alert('Create failed');
        });
      } else {
        // Update existing service
        this.http.put(`${this.apiUrl}/${this.service.serviceId}`, this.service, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).subscribe(response => {
          this.router.navigate(['/services']);
        }, error => {
          alert('Update failed');
        });
      }
    } else {
      alert('Please fill all the fields');
    }
  }

  cancel() {
    this.router.navigate(['/services']);
  }
}


