export class Attendee {
  attendeeName: string;
  attendeeSurname: string;
  attendeeEmail: string;
  attendeePhone: number;
  profileImageUrl?: string ;

  constructor(
    attendeeName: string,
    attendeeSurname: string,
    attendeeEmail: string,
    attendeePhone: number,
    profileImageUrl: string
  ) {
    this.attendeeName = attendeeName;
    this.attendeeSurname = attendeeSurname;
    this.attendeeEmail = attendeeEmail;
    this.attendeePhone = attendeePhone;
    this.profileImageUrl = profileImageUrl
  }
}



export class CheckIn {
  checkInDateTime: Date;
  ticketId: number;

  constructor(checkInDateTime: Date, ticketId: number) {
    this.checkInDateTime = checkInDateTime;
    this.ticketId = ticketId;
  }
}


export interface CheckInResponse {
  checkIn: {
    checkInDateTime: Date;
    ticketId: number;
  };
  profileImageUrl?: string | null;

  // Attendee details
  attendeeName: string;
  attendeeSurname: string;
  attendeeEmail: string;
  attendeePhone: number;
}
