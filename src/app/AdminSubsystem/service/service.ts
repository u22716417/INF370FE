export class Service {
    getEvents() {
      throw new Error('Method not implemented.');
    }
    id: number;
    serviceName: string;
    serviceDescription: string;
    isActive?: boolean; 
  
    constructor(
        id: number,
        serviceName: string,
        serviceDescription: string,
  
    ) {
      this.id = id;
      this.serviceName = serviceName;
      this.serviceDescription = serviceDescription;

    }
  }
  