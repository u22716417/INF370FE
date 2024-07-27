//import { Order } from './order';  // Make sure to define and import the Order class appropriately

export class ClientProfile {
  clientId: number;
  titleId?: number;
  subscriptionId?: number;
  //orders: Order[];
  clientName: string;
  clientSurname: string;
  clientPhone: string;
  clientEmail: string;

  constructor(
    clientId: number,
    clientName: string,
    clientSurname: string,
    clientPhone: string,
    clientEmail: string,
    titleId?: number,
    subscriptionId?: number,
    //orders: Order[] = []
  ) {
    this.clientId = clientId;
    this.titleId = titleId;
    this.subscriptionId = subscriptionId;
    //this.orders = orders;
    this.clientName = clientName;
    this.clientSurname = clientSurname;
    this.clientPhone = clientPhone;
    this.clientEmail = clientEmail;
  }
}
