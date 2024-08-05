import { Component,OnInit } from '@angular/core';
import { Faq } from '../faq';
import { FaqService } from '../service/faq-service.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-faq-create-update',
  templateUrl: './faq-create-update.component.html',
  styleUrls: ['./faq-create-update.component.css']
})
export class FaqCreateUpdateComponent implements OnInit{
  newFaq: Faq = {faqId: 0, Question: '', Answer: ''}
  
  isSubmitted:boolean = false;

  heading: string = '';

  


  constructor(public router: Router, private faqService:FaqService, private route: ActivatedRoute){}

  cancel() {
    this.router.navigate(['/component/faq-list']);

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['Id']);

      if (id > 0) {
        this.heading = 'Edit Faq';
        this.faqService.getFaqById(id).subscribe((response: any) => {
          this.newFaq = response;
          
     
        });
      } else {
        this.heading = 'Add Faq';
      }
    });
    // this.faq = { faqId: 0, Question: '',Answer: ''};
    // this.route.params.subscribe(params =>{
    //   const id = parseInt(params['Id']);

    //   if(id > 0) 
    //   {

    //     this.heading = 'Edit Faq';
    //     this.faqService.getFaqById(id)
    //     .subscribe(response => this.faq = response)
    //   }
    //   else
    //   {
    //     this.heading = 'Add FAQ'
    //   }
    
  // })
  }
  addFaq(faqForm:NgForm){
    if (faqForm.valid) {
      if (this.newFaq.faqId === 0) {
        this.faqService.createFaq(this.newFaq).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/faq']);
          } else {
            this.router.navigate(['/faq']);
          }
        });
      } else {
        this.faqService.updateFaq(this.newFaq.faqId,this.newFaq).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/faq']);
          } else {
            this.router.navigate(['/faq']);
          }
        });
      }
    } else {
      alert('Please fill all the fields');
    }
    // if (this.newFaq.Question != '' && this.newFaq.Answer != '' )
    // {
    //   if (this.newFaq.faqId === 0)
    //     {
    //       this.faqService.createFaq(this.newFaq)
    //       .subscribe(response => {
    //         if(response != null)
    //           {
    //             this.router.navigate(['/faq.ts']);
    //           }
    //           else
    //           {
    //             alert('Create failed');
    //           }
    //     })
    //     }
    //     else
    //     {
    //       alert('Update failed');
    //     }
    // }
    // else
    //   {
    //    alert('Please fill all the fields');
    //   }
  }
}
