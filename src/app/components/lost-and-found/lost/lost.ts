import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-lost',
  imports: [FormsModule, NgIf],
  templateUrl: './lost.html',
  styleUrl: './lost.css',
  encapsulation: ViewEncapsulation.None
})
export class Lost {
  formType = 'lost';
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

  lostPets = [
    { id: 1, name: 'Cony', age: '3 y.o.', description: 'loves to play in the shade', image: 'assets/images/cat3.jpg' },
    { id: 2, name: 'Martin', age: '1 y.o.', description: 'mix of butter', image: 'assets/images/cat4.jpg' },
    { id: 3, name: 'Max', age: '2 y.o.', description: 'loves making friends', image: 'assets/images/dog3.jpg' },
    { id: 4, name: 'Lesley', age: '8 m.o.', description: 'loves walking freely', image: 'assets/images/dog4.jpg' },
    { id: 5, name: 'Finn', age: '7 y.o.', description: 'already ready to have fun', image: 'assets/images/dog5.webp' },
    { id: 6, name: 'Sam', age: '5 y.o.', description: 'the happiest dog ever', image: 'assets/images/dog6.webp' },
    { id: 7, name: 'Didi', age: '4 y.o.', description: 'a real swimmer', image: 'assets/images/dog7.webp' },
    { id: 8, name: 'Lenny', age: '8 m.o.', description: 'best companion for relaxing', image: 'assets/images/dog8.webp' },
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
