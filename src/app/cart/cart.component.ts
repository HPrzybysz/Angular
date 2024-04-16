import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  items = this.cartService.getItems();
  total: number;
  // Inject the cart service in the constructor

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ){
    this.total = this.calculateTotal();
  }

  clearCart() {
    this.items = this.cartService.clearCart();
  }
  onSubmit(): void{
    this.items = this.cartService.clearCart();
    console.warn('Name and address:', this.checkoutForm.value, 'your order has been submitted! Price: ', this.total + '$');
    this.total = 0;
    this.checkoutForm.reset();
  }

  calculateTotal(): number{
    let total = 0;
    this.items.forEach(item => {
      total += item.price;
    });
    return total;
  }

}
