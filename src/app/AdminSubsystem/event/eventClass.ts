import { Venue } from "../venue/venue";

export interface Event {
    eventId: number;
    venueId?: number;
    eventName: string;
    eventDate: string; // Use string for compatibility with Angular's date handling
    eventTime: string; // Use string for compatibility with Angular's time handling
    eventDescription: string;
    eventType: string;
    eventLocation: string;
    attendances: Attendance[];
    eventWorkers: EventWorker[];
    venue?: Venue;
}

export interface Attendance {
    // Define properties of Attendance based on your C# model
}

export interface EventWorker {
    // Define properties of EventWorker based on your C# model
}

