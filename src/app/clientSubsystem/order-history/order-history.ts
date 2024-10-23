export interface Order {
    eventName?: string;         // For tickets
    ticketPrice?: number;       // For tickets
    ticketQuantity?: number;     // For tickets
    purchaseDate: Date;         // Common
    rating?: number;            // For ratings
    serviceName?: string;       // For services
    start?: Date;        // For service hires
    end?: Date;          // For service hires
    equipmentName?: string;     // For equipment
    startDate?: Date;      // For equipment hires
    endDate?: Date;       
    // Add more fields as necessary
  }