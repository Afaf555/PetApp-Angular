import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food',
  imports: [NgIf, FormsModule],
  templateUrl: './accessories.html',
  styleUrl: './accessories.css'
})
export class Accessories {
  searchQuery = '';

  products = [
    { id: 1, name: 'Leather Collar', description: 'Durable leather collar for dogs', price: 14.99, badge: 'Best seller', image: 'assets/images/26351_trixie_bikeset_deluxe_dog_hs_21_2.jpg' },
    { id: 2, name: 'DogRunner Cycle Mount', description: '5m retractable leash', price: 18.99, badge: null, image: 'assets/images/60956_PLA_Kleinmetall_Fahrrad_Leinenhalter_DogRunner_6.jpg' },
    { id: 3, name: 'Car Safety Belt for Dogs', description: 'Comfortable travel safety belt', price: 34.99, badge: 'New', image: 'assets/images/125096_trixie_kurzf_hrer_20mm_12771_2_8.jpg' },
    { id: 4, name: 'Ferplast Piano 6 Bird Cage', description: 'Black/Brown Bird Cage', price: 12.99, badge: null, image: 'assets/images/352200_pla_ferplast_vogelkaefig_piano_6_braun_schwarz_hs_01_5.jpg' },
    { id: 5, name: 'Bone Bowl Placemat', description: 'Soft bowl placemat', price: 42.99, badge: 'Premium', image: 'assets/images/415998_pla_tiaki_bone_shaped_silicone_mat_fg_9777_0.jpg' },
    { id: 6, name: 'Silicone Snack pouch', description: 'Snack pouch', price: 9.99, badge: null, image: 'assets/images/448798_pla_nt_silicone_snack_bag_fg_6347_3.jpg' },
    { id: 7, name: 'Smart Automatic Feeder', description: 'Double bowl with automatic features', price: 55.99, badge: 'New', image: 'assets/images/546800_platrixie_futterautomat_tx_c_smart_ersatz_doppelnapf_hs_01_0.jpg' },
    { id: 8, name: 'Pet Couch Cushion', description: 'Couch Cushion - Grey', price: 28.99, badge: null, image: 'assets/images/610696_610697_pla_kerbl_pet_couchkissen_emalia_grau_hs_01_1.jpg' },
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
