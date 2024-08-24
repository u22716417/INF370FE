import { Component, OnInit } from '@angular/core';
import { HireEmployeeServiceService } from '../service/hire-employee-service.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements  OnInit{

  employee: any[] = [];
  dtOptions: Config = {};
  ngOnInit(): void {
   this.getEmployees();
  }

  constructor(private employeeService: HireEmployeeServiceService){}

getEmployees(): void{
this.employeeService.getEmployees().subscribe(employees => {
  this.employee = employees});
  this.dtOptions = {
    pagingType: 'full_numbers'
  };
}

exportToJson(): void {
  const dataStr = JSON.stringify(this.employee, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileName = 'employees.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileName);
  linkElement.click();
}

}