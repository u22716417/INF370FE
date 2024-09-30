import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../sponsor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SponsorServiceService } from '../service/sponsor-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsor-create-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sponsor-create-update.component.html',
  styleUrls: ['./sponsor-create-update.component.css']
})
export class SponsorCreateUpdateComponent implements OnInit {
  newSponsor: Sponsor = { sponsorId: 0, sponsorName: '', sponsorDescription: '', sponsorEmail: '', sponsorPhone: 0 };
  isSubmitted: boolean = false;
  heading: string = '';
  showHelpModal = false;  // State for displaying help modal
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(
    public router: Router,
    private sponsorService: SponsorServiceService,
    private route: ActivatedRoute
  ) { }

  cancel() {
    console.log('Cancel button clicked');
    this.router.navigate(['/component/sponsor-list']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10); // Get the sponsor ID from route params
  
      if (id > 0) {
        // Edit mode
        this.heading = 'Edit Sponsor';
        this.sponsorService.getSponsorById(id).subscribe((response: Sponsor) => {
          this.newSponsor = response; // Pre-fill form with existing sponsor data
        });
      } else {
        // Create mode
        this.heading = 'Add Sponsor';
      }
    });
  }
  
  addSponsor(sponsorForm: NgForm) {
    if (sponsorForm.valid) {
      console.log('Sponsor data:', this.newSponsor); // Log the sponsor data
  
      if (this.newSponsor.sponsorId === 0) {
        // Create new sponsor
        this.sponsorService.createSponsor(this.newSponsor).subscribe(
          (response: any) => {
            console.log('Creation response:', response); // Log the response
            this.router.navigate(['/sponsors']);
          },
          (error) => {
            console.error('Creation failed:', error);
            this.showPopupNotification('An error occurred while creating the sponsor.');
          }
        );
      } else {
        // Update existing sponsor
        this.sponsorService.updateSponsor(this.newSponsor.sponsorId, this.newSponsor).subscribe(
          (response: any) => {
            console.log('Update response:', response); // Log the response
            if (response) {
              this.showPopupNotification('Sponsor update successful!');
              this.router.navigate(['/component/sponsor-list']);

            } else {
              this.showPopupNotification('Sponsor update failed or sponsor already exists.');
            }
          },
          (error) => {
            console.error('Update failed:', error);
            this.showPopupNotification('An error occurred while updating the sponsor.');
          }
        );
      }
    } else {
      this.showPopupNotification('Please fill in the required fields');
    }
  }
  
  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
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
