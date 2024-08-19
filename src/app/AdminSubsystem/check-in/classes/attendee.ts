export interface Attendee {
    id: number;
    name: string;
    surname: string;
    phone: number;
    barcode: string;
    checkInId?: number;
    checkInDateTime?: Date;
  }