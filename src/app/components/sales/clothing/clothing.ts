import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food',
  imports: [NgIf, FormsModule],
  templateUrl: './clothing.html',
  styleUrl: './clothing.css'
})
export class Clothing {
  searchQuery = '';

  products = [
    { id: 1, name: 'Winter Jacket', description: 'Warm fleece jacket for small dogs', price: 22.99, badge: 'Best seller', image: 'assets/images/cloth1.jpg' },
    { id: 2, name: 'Summer Dress', description: 'Light cotton dress for female dogs', price: 16.99, badge: null, image: 'assets/images/cloth2.jpg' },
    { id: 3, name: 'Rain Coat', description: 'Waterproof coat for rainy days', price: 28.99, badge: 'New', image: 'assets/images/cloth3.jpg' },
    { id: 4, name: 'Knit Sweater', description: 'Cozy knit sweater for winter', price: 19.99, badge: null, image: 'assets/images/cloth4.jpg' },
    { id: 5, name: 'Birthday Outfit', description: 'Special occasion pet outfit', price: 24.99, badge: 'Premium', image: 'assets/images/cloth5.jpg' },
    { id: 6, name: 'Sports Jersey', description: 'Breathable sports wear', price: 14.99, badge: null, image: 'assets/images/cloth6.jpg' },
    { id: 7, name: 'Pyjama Set', description: 'Soft cotton pyjamas for pets', price: 18.99, badge: 'New', image: 'assets/images/cloth7.jpg' },
    { id: 8, name: 'Halloween Costume', description: 'Fun costume for special occasions', price: 21.99, badge: null, image: 'assets/images/cloth8.jpg' },
  ];
  filteredProducts = [...this.products];

  filterProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }
}
