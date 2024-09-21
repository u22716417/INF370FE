export class Venue {
  venueAddress: string;
  venueCapacity: number;
  venueContactNumber: string;
  venueContactPerson: string;
  venueDescription: string;
  venueId: number;
  venueName: string;
  image?: string;
 

  constructor(
    venueAddress: string,
    venueCapacity: number,
    venueContactNumber: string,
    venueContactPerson: string,
    venueDescription: string,
    venueId: number,
    venueName: string,
    image?: string
  ) {
    this.venueAddress = venueAddress;
    this.venueCapacity = venueCapacity;
    this.venueContactNumber = venueContactNumber;
    this.venueContactPerson = venueContactPerson;
    this.venueDescription = venueDescription;
    this.venueId = venueId;
    this.venueName = venueName;
    this.image = image;
  }
}
