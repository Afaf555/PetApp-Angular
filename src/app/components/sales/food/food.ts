import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food',
  imports: [FormsModule],
  templateUrl: './food.html',
  styleUrl: './food.css'
})
export class Food {
  searchQuery = '';
  showToast = false;

  constructor(private cdr: ChangeDetectorRef) {}

  products = [
    { id: 1, name: 'Royal Canin Adult', description: 'Complete dry food for adult dogs', price: 24.99, badge: 'Best seller', image: 'assets/images/royalcaninadult.jpg' },
    { id: 2, name: 'Whiskas Cat Food', description: 'Food for cats', price: 12.99, badge: null, image: 'assets/images/exclusion2.webp' },
    { id: 3, name: 'Purina Pro Plan', description: 'High protein formula for active dogs', price: 32.99, badge: 'New', image: 'assets/images/purina.jpg' },
    { id: 4, name: 'Hill\'s Science Diet', description: 'Vet recommended nutrition', price: 28.99, badge: null, image: 'assets/images/hills.jpg' },
    { id: 5, name: 'Orijen Dog Food', description: 'Biologically appropriate dog food', price: 45.99, badge: 'Premium', image: 'assets/images/orijen.jpg' },
    { id: 6, name: 'Felix Cat Pouches', description: 'Meaty jelly meals for cats', price: 9.99, badge: null, image: 'assets/images/felix.jpg' },
    { id: 7, name: 'Pedigree Adult', description: 'Complete balanced dry dog food', price: 18.99, badge: null, image: 'assets/images/pedigree.jpg' },
    { id: 8, name: 'Acana Puppy', description: 'Wholesome grains for puppies', price: 38.99, badge: 'New', image: 'assets/images/exclusion.png' },
  ];

  filteredProducts = [...this.products];

  filterProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  addToCart(product: any) {
    this.showToast = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
