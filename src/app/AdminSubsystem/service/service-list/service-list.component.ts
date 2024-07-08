import { Component, OnInit } from '@angular/core';
import { Service } from '../service';
import { ServicesServiceService } from '../service/services-service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit {
services:Service[]=[]
filteredService: Service[]=[];
searchTerm: string = '';
isPopupVisible: boolean = false;

constructor(private serviceService: ServicesServiceService){}

  ngOnInit(): void {
    this.getAllServices()
    console.log(this.services);
  }

  getAllServices() {
    this.serviceService.getAllServices().subscribe(result =>{
      let ServiceList:any[] = result
      ServiceList.forEach((element) => {
        this.filteredService.push(element);
        this.services.unshift(element)
      });
    })
  }

  deleteById(serviceId: number){
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete){
      this.serviceService.deleteServiceById(parseInt(serviceId+ ''))
      .subscribe(response => {
        if (response != null)
          {
            location.reload();
          }
      })
    }
  }

filterServices(){
console.log(this.searchTerm.length)
if(this.searchTerm.length <= 2){
  this.filteredService =[]
}
else{
  this.filteredService = this.services.filter((value) => (
    value.serviceName.toLowerCase().includes(this.searchTerm.toLowerCase())
  ));
  }
}

}
