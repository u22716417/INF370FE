import { Component, OnInit } from '@angular/core';
import { CouponCode } from '../couponCode';
import { CodeServiceService } from '../service/code-service.service';

@Component({
  selector: 'app-codes-list',
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.css']
})
export class CodesListComponent implements OnInit{

  codes:CouponCode[]=[];
  showModal: boolean = false;
  selectedCouponCode: CouponCode | null = null;

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

  openSendEmailModal(code: CouponCode) {
    this.selectedCouponCode = code;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCouponCode = null;
  }

  sendEmail() {
    if (this.selectedCouponCode) {
      const sponsorId = this.selectedCouponCode.couponCodeId; // Assuming you have a way to get sponsor ID
      const couponCodeId = this.selectedCouponCode.couponCodeId;

      this.codeService.sendCouponCodeEmail(sponsorId, couponCodeId).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
          this.closeModal();
        },
        (error) => {
          console.error('Error sending email:', error);
          this.closeModal();
        }
      );
    }
  }

}
