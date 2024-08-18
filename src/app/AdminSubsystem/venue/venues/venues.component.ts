import { Component, OnInit } from '@angular/core';
import { Venue } from '../venue';
import { VenueService } from '../service/venue-service.service';

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

constructor(private venueService: VenueService){}

  ngOnInit(): void {
    this.getAllVenues()
    console.log(this.venues);
  }

  getAllVenues() {
    this.venueService.getAllVenues().subscribe(result =>{
      let venueList:any[] = result
      venueList.forEach((element) => {
        this.filterVenue.push(element);
        this.venues.unshift(element)
      });
    })
  }

  deleteById(venueId: number){
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete){
      this.venueService.deleteVenueById(parseInt(venueId+ ''))
      .subscribe(response => {
        if (response != null)
          {
            location.reload();
          }
      })
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

}