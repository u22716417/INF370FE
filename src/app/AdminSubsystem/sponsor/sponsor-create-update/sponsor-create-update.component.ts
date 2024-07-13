import { Component } from '@angular/core';
import { Sponsor } from '../sponsor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SponsorServiceService } from '../service/sponsor-service.service';

@Component({
  selector: 'app-sponsor-create-update',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './sponsor-create-update.component.html',
  styleUrls: ['./sponsor-create-update.component.css']
})
export class SponsorCreateUpdateComponent {

  newSponsor: Sponsor = { sponsorId: 0, sponsorName: '', sponsorDescription: '', sponsorEmail: '', sponsorPhone: 0 };
  isSubmitted: boolean = false;
  heading: string = '';

  constructor(private router: Router, private sponsorService: SponsorServiceService, private route: ActivatedRoute) { }

  cancel() {
    this.router.navigate(['/sponsors']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['Id']);

      if (id > 0) {
        this.heading = 'Edit Sponsor';
        this.sponsorService.getSponsorById(id).subscribe((response: any) => {
          this.newSponsor = response;
        });
      } else {
        this.heading = 'Add Sponsor';
      }
    });
  }

  addSponsor(sponsorForm: NgForm) {
    if (sponsorForm.valid) {
      if (this.newSponsor.sponsorId === 0) {
        this.sponsorService.createSponsor(this.newSponsor).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/sponsors']);
          } else {
            this.router.navigate(['/sponsors']);
          }
        });
      } else 
      {
        this.sponsorService.updateSponsor(this.newSponsor.sponsorId,this.newSponsor).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/sponsors']);
          } else {
            alert('Update failed');
          }
        });
      }
    } else {
      alert('Please fill all the fields');
    }
  }
}
