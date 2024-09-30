import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Venue } from '../venue';
import { VenueService } from '../service/venue-service.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

venues:Venue[]=[]
filterVenue: Venue[]=[];
searchTerm: string = '';
isPopupVisible: boolean = false;
dtOptions: Config = {};
showHelpModal = false;  // State for displaying help modal
errorMessage: string | null = null;
isLoading = false;
showNotification: boolean = false;
notificationMessage: string = '';
@ViewChild('fileInput') fileInput!: ElementRef; 

constructor(private venueService: VenueService){}

  ngOnInit(): void {
    this.getAllVenues()
    console.log(this.venues);
  }

  getAllVenues(): void {
    this.venueService.getAllVenues().subscribe(
      (result) => {
        let venueList: any[] = result;
        venueList.forEach((element) => {
          this.filterVenue.push(element);
          this.venues.unshift(element);
        });
        this.dtOptions = {
          pagingType: 'full_numbers'
        };
      },
      (error) => {
        console.error('Error loading venues:', error);
        this.showPopupNotification('Failed to load venues. Please try again later.');
      }
    );
  }
  loadVenues(): void {
    this.venueService.getAllVenues().subscribe(
      (data: Venue[]) => {
        this.venues = data;
      },
      (error) => {
        console.error('Error loading sponsors:', error);
        this.showPopupNotification('Failed to load sponsors. Please try again later.');
      }
    );
  }

  deleteById(venueId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to remove this venue?');
  
    if (confirmDelete) {
      this.venueService.deleteVenueById(parseInt(venueId + '')).subscribe(
        (response) => {
          if (response != null) {
            this.showPopupNotification('Venue has been removed succesfully');
            location.reload();
          } else {
            this.showPopupNotification('Failed to remove venue');
          }
        },
        (error) => {
          console.error('Error removing venue:', error);
          this.showPopupNotification('Failed to remove venue. Please try again later.');
        }
      );
    }
  }
  


filterVenues(){
console.log(this.searchTerm.length)
if(this.searchTerm.length <= 2){
  this.filterVenue =[]
}
else{
  this.filterVenue = this.venues.filter((value) => (
    value.venueName.toLowerCase().includes(this.searchTerm.toLowerCase())
  ));
  }
}

exportToJson(): void {
  const dataStr = JSON.stringify(this.filterVenue.length ? this.filterVenue : this.venues, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileName = 'venues.json';

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

onFileSelected(event: any): void {
  const file = event.target.files[0];
  console.log(file);  // Check if the file is correctly detected

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log('File content:', jsonData);  // Check file content
        this.saveImportedVenues(jsonData);  // Save the parsed data
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
importVenues(): void {
  console.log('Import button clicked');
  this.fileInput.nativeElement.click();  // Trigger the file input click programmatically
}

// Save sponsors via the backend service
saveImportedVenues(venues: Venue[]): void {
  console.log('Sending data to the backend:', venues);  // Log the data sent to the backend
  this.venueService.importVenues(venues).subscribe(
    () => {
      this.loadVenues();  // Reload the sponsor list after successful import
      this.showPopupNotification('Venues imported successfully');
      console.log('Import successful');
    },
    (error) => {
      console.error('Error importing venues:', error);
      this.showPopupNotification('Failed to import venues. Please try again.');
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