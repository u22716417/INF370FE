import { Component, OnInit } from '@angular/core';
import { Faq } from '../faq';
import { FaqService } from '../service/faq-service.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit{
  faqs:Faq[]=[]
  filterFaq: Faq[]=[];
  searchTerm: string = '';
  isPopupVisible: boolean = false;

  constructor(private faqService: FaqService){}

  ngOnInit(): void {
    this.getAllFaqs();
    // console.log(this.faqs);
  }

  getAllFaqs() {
    this.faqService.getAllFaqs().subscribe(result =>{
      let faqList:any[] = result
      faqList.forEach((element) => {
        this.filterFaq.push(element);
        this.faqs.unshift(element)
      });
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
}
