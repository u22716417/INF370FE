import { Component, OnInit } from '@angular/core';
import { CouponCode } from '../couponCode';
import { CodeServiceService } from '../service/code-service.service';

@Component({
  selector: 'app-codes-list',
  templateUrl: './codes-list.component.html',
  styleUrl: './codes-list.component.css'
})
export class CodesListComponent implements OnInit{

  codes:CouponCode[]=[]

  constructor(private codeService: CodeServiceService){

  }

  ngOnInit(): void {
    this.getAllCodes()
    console.log(this.codes);
  }

  getAllCodes() {
    this.codeService.getAllCodes().subscribe(result =>{
     
      let codesList:any[] = result
      codesList.forEach((element) => {
        this.codes.unshift(element)
      });
    })
  }

  deleteById(couponCodeId: number){
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete){
      this.codeService.deleteCodeById(parseInt(couponCodeId+ ''))
      .subscribe(response => {
        if (response != null)
          {
            location.reload();
          }
      })
    }
  }

}
