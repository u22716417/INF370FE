import { Venue } from "../venue/venue";

export interface Event {
    id: number;
    title: string;
    description: string;
    eventType: string;
    eventRemainingTickets: number;
    eventAddress: string;
    image: string;
    eventDate: string; // in 'dd/MM/yyyy' format
    eventTime: string; // in 'HH:mm' format
    venueId: 0;
    eventPrice: number
}

