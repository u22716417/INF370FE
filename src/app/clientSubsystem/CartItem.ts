// cart-item.model.ts
export class CartItem {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public quantity: number = 1
  ) {}
}
