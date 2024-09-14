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
  newFaq: Faq = {faqId: 0, question: '', answer: ''}
  
  isSubmitted:boolean = false;

  heading: string = '';

  showHelpModal = false;  // State for displaying help modal



  constructor(public router: Router, private faqService:FaqService, private route: ActivatedRoute){}

  cancel() {
    this.router.navigate(['/component/faq-list']);

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id']);

      if (id > 0) {
        this.heading = 'Edit Faq';
        this.faqService.getFaqById(id).subscribe((response: any) => {
          this.newFaq = response;
          if( this.newFaq.answer == 'Pending')
          {
            this.newFaq.answer = '';
          }

        });
      } else {
        this.heading = 'Add Faq';
      }
    });
   
  }
  addFaq(faqForm:NgForm){
    if (faqForm.valid) {
      if (this.newFaq.faqId === 0) {
        this.faqService.createFaq(this.newFaq).subscribe((response: any) => {
          
            this.router.navigate(['/component/faq-list'])
        });
      } else {
        this.faqService.updateFaq(this.newFaq.faqId,this.newFaq).subscribe((response: any) => {
            this.router.navigate(['/component/faq-list']);          
        });
      }
    } else {
      alert('Please fill all the fields');
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
