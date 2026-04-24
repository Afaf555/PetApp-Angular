import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  selectedPet: any = null;

  adoptForm = {
    fullName: '',
    email: '',
    phone: '',
    petType: '',
    living: '',
    otherPets: '',
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
    this.selectedPet = null;
    this.showModal = true;
    this.submitted = false;
    this.cdr.detectChanges();
  }

  openModalForPet(pet: any) {
    this.selectedPet = pet;
    this.adoptForm = {
      fullName: '',
      email: '',
      phone: '',
      petType: pet.type || 'Dog',
      living: '',
      otherPets: '',
      reason: ''
    };
    this.showModal = true;
    this.submitted = false;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.submitted = false;
    this.selectedPet = null;
    this.adoptForm = {
      fullName: '', email: '', phone: '',
      petType: '', living: '', otherPets: '', reason: ''
    };
    this.cdr.detectChanges();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
      this.cdr.detectChanges();
      return;
    }

    const request = {
      ...this.adoptForm,
      petName: this.selectedPet?.name || '',
      petId: this.selectedPet?.id || null
    };

    this.petService.saveAdoptionRequest(request).subscribe({
      next: () => {
        this.submitted = true;
        this.cdr.detectChanges();
        setTimeout(() => this.closeModal(), 2500);
      },
      error: (err) => console.error(err)
    });
  }
}
