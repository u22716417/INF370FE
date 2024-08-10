import { Venue } from "../venue/venue";

export  interface Event {
    eventDate: string;
    eventDescription: string;
    eventId: number;
    eventImage: string;
    eventLocation: string;
    eventName: string;
    eventRemainingTickets: number;
    eventTime: string;
    eventType: string;
    attendances: any[]; // Adjust the type if you know what the structure of attendances will be
    eventWorkers: any[]; // Adjust the type if you know what the structure of eventWorkers will be
    ticketPrices: any[]; // Adjust the type if you know what the structure of ticketPrices will be
    tickets: any[]; // Adjust the type if you know what the structure of tickets will be
    venue: any; // Adjust the type if you know what the structure of venue will be
    venueId: number;
}

export interface EventVM {
    id: number;
    title: string;
    description: string;
    eventType: string;
    eventRemainingTickets: number;
    eventAddress: string;
    image: string;
    eventPrice: number;
    eventTime: string;
    ticketPriceId: number;
    ticketTypeId: number;
    eventDate: string;
    venueId: number;
}