import { Component, OnInit } from '@angular/core';
import { CouponCode } from '../couponCode';
import { CodeServiceService } from '../service/code-service.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-codes-list',
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.css']
})
export class CodesListComponent implements OnInit{

  codes:CouponCode[]=[];
  showModal: boolean = false;
  selectedCouponCode: CouponCode | null = null;
  showNotification: boolean = false;
  notificationMessage: string = '';
  dtOptions: Config = {};
  showHelpModal = false;  // State for displaying help modal

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
      const couponCodeId = this.selectedCouponCode.couponCodeId;
      const sponsorId = this.selectedCouponCode.sponsorId; // Get the sponsorId from the selectedCouponCode

      this.codeService.sendCouponCodeEmail(sponsorId, couponCodeId).subscribe(
        (response) => {
          console.log('Email sent successfully:', response);
          this.showPopupNotification('Sent coupon code email');
          this.closeModal();
        },
        (error) => {
          console.error('Error sending email:', error);
          this.showPopupNotification('Error sending email');
          this.closeModal();
        }
      );
    }
  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
  
  exportToJson(): void {
    const dataStr = JSON.stringify(this.codes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileName = 'coupon_codes.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }


  // Method to open help modal
openHelpModal() {
  this.showHelpModal = true;
}

// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}
}
