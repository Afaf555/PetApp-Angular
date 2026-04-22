import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-found',
  imports: [FormsModule, NgIf],
  templateUrl: './found.html',
  styleUrl: './found.css',
  encapsulation: ViewEncapsulation.None
})
export class Found {
  formType = 'found';
  submitted = false;
  previewUrl: string | null = null;

  petForm = {
    name: '',
    type: 'Dog',
    breed: '',
    color: '',
    gender: 'Male',
    location: '',
    date: '',
    description: '',
    contact: ''
  };

  foundPets = [
    { id: 1, name: 'Unknown', age: '~2 y.o.', description: 'found near city park', image: 'assets/images/cat.jpg' },
    { id: 2, name: 'Unknown', age: '~1 y.o.', description: 'found on main street', image: 'assets/images/dog14.webp' },
    { id: 3, name: 'Unknown', age: '~3 y.o.', description: 'found near school', image: 'assets/images/dog8.webp' },
    { id: 4, name: 'Unknown', age: '~5 y.o.', description: 'found in neighborhood', image: 'assets/images/dog15.webp' },
  ];

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
    this.submitted = true;
  }
}
