import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { PetService } from '../../../services/pet';

@Component({
  selector: 'app-want-to-adopt',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './want-to-adopt.html',
  styleUrls: ['./want-to-adopt.css']
})
export class WantToAdopt implements OnInit {

  submitted = false;
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

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.petService.getAdoptionPets().subscribe({
      next: (data) => {
        this.pets = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  onSubmit() {
    if (!this.adoptForm.fullName || !this.adoptForm.email) {
      alert('Fill required fields!');
      return;
    }

    this.petService.saveAdoptionRequest(this.adoptForm).subscribe({
      next: () => {
        this.submitted = true;
        this.adoptForm = {
          fullName: '',
          email: '',
          phone: '',
          petType: 'Dog',
          living: 'Apartment',
          otherPets: 'No',
          reason: ''
        };
      },
      error: (err) => console.error(err)
    });
  }
}
