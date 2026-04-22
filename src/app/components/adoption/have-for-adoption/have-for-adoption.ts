import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PetService } from '../../../services/pet';
@Component({
  selector: 'app-have-for-adoption',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './have-for-adoption.html',
  styleUrls: ['./have-for-adoption.css']
})
export class HaveForAdoption {

  submitted = false;
  previewUrl: string | null = null;

  constructor(private petService: PetService) {}

  petForm = {
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    color: '',
    description: '',
    contact: ''
  };

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit() {
    if (!this.petForm.name || !this.petForm.contact) {
      alert('Please fill required fields!');
      return;
    }

    const pet = {
      ...this.petForm,
      status: 'adoption',
      image: this.previewUrl || ''
    };

    this.petService.savePet(pet).subscribe({
      next: () => {
        this.submitted = true;
        this.petForm = {
          name: '',
          type: 'Dog',
          breed: '',
          age: '',
          color: '',
          description: '',
          contact: ''
        };
        this.previewUrl = null;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
