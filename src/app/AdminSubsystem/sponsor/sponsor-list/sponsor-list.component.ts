import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SponsorServiceService } from '../service/sponsor-service.service';
import { Sponsor } from '../sponsor';
import { RouterLink } from '@angular/router';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {

  sponsors: Sponsor[] = [];
  newSponsor: Sponsor = {
    sponsorId: 0,
    sponsorName: '',
    sponsorDescription: '',
    sponsorEmail: '',
    sponsorPhone: 0
  };
  dtOptions: Config = {};
  showHelpModal = false;  // State for displaying help modal
  errorMessage: string | null = null;
  isLoading = false;
  showNotification: boolean = false;
  notificationMessage: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef; 

  constructor(private sponsorService: SponsorServiceService) { }

  editSponsor: Sponsor | null = null;
  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors(): void {
    this.sponsorService.getSponsors().subscribe(
      (data: Sponsor[]) => {
        this.sponsors = data;
      },
      (error) => {
        console.error('Error loading sponsors:', error);
        this.showPopupNotification('Failed to load sponsors. Please try again later.');
      }
    );
  }
  

  deleteSponsor(sponsorId: number): void {
    this.sponsorService.deleteSponsor(sponsorId).subscribe(
      () => {
        this.sponsors = this.sponsors.filter(s => s.sponsorId !== sponsorId);
        this.showPopupNotification('Sponsor has been removed successfully');
      },
      (error) => {
        console.error('Error deleting sponsor:', error);
        this.showPopupNotification('Failed to delete sponsor. Please try again later.');
      }
    );
  }
  

  selectSponsor(sponsor: Sponsor): void {
    this.editSponsor = { ...sponsor };
  }

  exportToJson(): void {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.sponsors, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sponsors.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

   // Method to open help modal
openHelpModal() {
  this.showHelpModal = true;
}

// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}

// Method to handle file input
onFileSelected(event: any): void {
  const file = event.target.files[0];
  console.log(file);  // Check if the file is correctly detected

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log('File content:', jsonData);  // Check file content
        this.saveImportedSponsors(jsonData);  // Save the parsed data
      } catch (error) {
        this.showPopupNotification('Invalid JSON file');
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);  // Read the file as text
  } else {
    console.log('No file selected');
  }
}

// Trigger file input click
importSponsors(): void {
  console.log('Import button clicked');
  this.fileInput.nativeElement.click();  // Trigger the file input click programmatically
}

// Save sponsors via the backend service
saveImportedSponsors(sponsors: Sponsor[]): void {
  console.log('Sending data to the backend:', sponsors);  // Log the data sent to the backend
  this.sponsorService.importSponsors(sponsors).subscribe(
    () => {
      this.loadSponsors();  // Reload the sponsor list after successful import
      this.showPopupNotification('Sponsors imported successfully');
      console.log('Import successful');
    },
    (error) => {
      console.error('Error importing sponsors:', error);
      this.showPopupNotification('Failed to import sponsors. Please try again.');
    }
  );
}

showPopupNotification(message: string): void {
  this.notificationMessage = message;
  this.showNotification = true;
  setTimeout(() => {
    this.showNotification = false;
    this.notificationMessage = '';
  }, 3000);
}

}
