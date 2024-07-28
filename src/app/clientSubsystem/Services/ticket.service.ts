import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CartItem } from '../CartItem';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  cart: any[] = [];

   url = 'https://localhost:7149/api/Events/getEvents';  // Get All events
   baseUrl = 'https://localhost:7149/api/Events';
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    
    return this.http.get<any[]>(this.url);
  }

  getEventById(Id: number): Observable<any> {
    
    return this.http.get<any[]>(this.baseUrl+'/'+Id);
  }
  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCart()
  {
    return this.cart;
  }

  addToCart(cartItem: CartItem): void {
    const existingItem = this.cart.find(item => item.id === cartItem.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push(new CartItem(cartItem.id, cartItem.title, cartItem.price, 1));
    }
  }

  removeFromCart(id: number): void {
    const existingItem = this.cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        this.cart = this.cart.filter(item => item.id !== id);
      }
    }
  }
  AddQuantityCart(id: number): void {
    const existingItem = this.cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
      if (existingItem.quantity === 0) {
        this.cart = this.cart.filter(item => item.id !== id);
      }
    }
  }
 
  getCartCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

}
