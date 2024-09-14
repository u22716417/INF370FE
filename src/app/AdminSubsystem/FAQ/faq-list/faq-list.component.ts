import { Component, OnInit } from '@angular/core';
import { Faq } from '../faq';
import { FaqService } from '../service/faq-service.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit{
  faqs:any[]=[]
  filterFaq: Faq[]=[];
  searchTerm: string = '';
  isPopupVisible: boolean = false;
  dtOptions: Config = {};
  showHelpModal = false;  // State for displaying help modal


  constructor(private faqService: FaqService){}

  ngOnInit(): void {
    this.getAllFaqs();
    
  }

  getAllFaqs() {
    this.faqService.getAllFaqs().subscribe(result =>{
      this.faqs  = [...result];
      console.log(this.faqs);
      this.dtOptions = {
        pagingType: 'full_numbers'
      };
    })
  }

  deleteById(faqId: number){
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete){
      this.faqService.deleteFaqById(parseInt(faqId + ''))
      .subscribe(response => {
        if (response != null)
          {
            location.reload();
          }
      })
    }
  }


filterFaqs(){
console.log(this.searchTerm.length)
if(this.searchTerm.length <= 2){
  this.filterFaq =[]
}
else{
  this.filterFaq = this.faqs.filter((value) => (
    value.Question.toLowerCase().includes(this.searchTerm.toLowerCase())
  ));
  }
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
