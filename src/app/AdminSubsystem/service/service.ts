export class Service {
    serviceId: number;
    serviceTypeId: number;
    serviceName: string;
    serviceDescription: string;
    assignments?: string;
  
    constructor(
        serviceId: number,
        serviceTypeId: number,
        serviceName: string,
        serviceDescription: string,
        assignments: string
    ) {
      this.serviceId = serviceId;
      this.serviceTypeId = serviceTypeId;
      this.serviceName = serviceName;
      this.serviceDescription = serviceDescription;
      this.assignments = assignments;
    }
  }
  