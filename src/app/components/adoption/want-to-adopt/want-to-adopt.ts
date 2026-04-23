import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../../services/pet';

@Component({
  selector: 'app-want-to-adopt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './want-to-adopt.html',
  styleUrls: ['./want-to-adopt.css']
})
export class WantToAdopt implements OnInit {
  submitted = false;
  showModal = false;
  pets: any[] = [];

  adoptForm = {
    fullName: '',
    email: '',
    phone: '',
    petType: 'Dog',
    living: 'Apartment',
    otherPets: 'No',
    reason: ''
  };

  constructor(private petService: PetService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPets();
  }

  loadPets() {
    this.petService.getAdoptionPets().subscribe({
      next: (data) => {
        this.pets = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  openModal() {
    this.showModal = true;
    this.submitted = false;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.submitted = false;
    this.adoptForm = {
      fullName: '', email: '', phone: '',
      petType: 'Dog', living: 'Apartment', otherPets: 'No', reason: ''
    };
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (!this.adoptForm.fullName || !this.adoptForm.email) {
      alert('Fill required fields!');
      return;
    }

    this.petService.saveAdoptionRequest(this.adoptForm).subscribe({
      next: () => {
        this.submitted = true;
        this.cdr.detectChanges();
        setTimeout(() => this.closeModal(), 2500);
      },
      error: (err) => console.error(err)
    });
  }
}
