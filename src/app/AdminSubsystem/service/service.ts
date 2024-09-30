export class Service {
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
  