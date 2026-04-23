import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PetService } from '../../../services/pet';

@Component({
  selector: 'app-have-for-adoption',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './have-for-adoption.html',
  styleUrls: ['./have-for-adoption.css']
})
export class HaveForAdoption {
  submitted = false;
  showModal = false;
  previewUrl: string | null = null;

  constructor(private petService: PetService, private cdr: ChangeDetectorRef) {}

  petForm = {
    name: '',
    type: '',
    breed: '',
    age: '',
    color: '',
    description: '',
    contact: ''
  };

  openModal() {
    this.showModal = true;
    this.submitted = false;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showModal = false;
    this.submitted = false;
    this.petForm = { name: '', type: '', breed: '', age: '', color: '', description: '', contact: '' };
    this.previewUrl = null;
    this.cdr.detectChanges();
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const canvas = document.createElement('canvas');
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.onload = () => {
          const maxWidth = 400;
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          this.previewUrl = canvas.toDataURL('image/jpeg', 0.6);
          this.cdr.detectChanges();
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
      this.cdr.detectChanges();
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
        this.cdr.detectChanges();
        setTimeout(() => this.closeModal(), 2500);
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong. Please try again.');
      }
    });
  }
}
