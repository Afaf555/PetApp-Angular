import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supplements-shop',
  imports: [FormsModule],
  templateUrl: './supplements.html',
  styleUrl: './supplements.css'
})
export class Supplements {
  searchQuery = '';
  showToast = false;

  constructor(private cdr: ChangeDetectorRef) {}

  products = [
    { id: 1, name: 'Omega-3 Fish Oil', description: 'Supports coat and skin health', price: 19.99, badge: 'Best seller', image: 'assets/images/flexadin.webp' },
    { id: 2, name: 'Joint Support', description: 'Glucosamine for joint health', price: 24.99, badge: null, image: 'assets/images/pet-protect.webp' },
    { id: 3, name: 'Probiotic Chews', description: 'Digestive health support', price: 17.99, badge: 'New', image: 'assets/images/pet-tabs.webp' },
    { id: 4, name: 'Multivitamin', description: 'Daily vitamins for dogs', price: 22.99, badge: null, image: 'assets/images/multivitamin.webp' },
    { id: 5, name: 'Calming Treats', description: 'Natural stress relief for pets', price: 15.99, badge: 'Premium', image: 'assets/images/Wellness_Products_For_Dogs___Wild_Ones.jpg' },
    { id: 6, name: 'Dental Sticks', description: 'Cleans teeth and freshens breath', price: 11.99, badge: null, image: 'assets/images/Coachi_Expert_training_range.jpg' },
    { id: 7, name: 'Immunity Boost', description: 'Strengthens immune system', price: 26.99, badge: 'New', image: 'assets/images/Allergy_Immune_Supplement_for_Dogs.jpg' },
    { id: 8, name: 'Senior Formula', description: 'Special care for older pets', price: 29.99, badge: null, image: 'assets/images/8_Best_Eye_Supplements_for_Vizslas.jpg' },
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
