import { Component, ViewEncapsulation, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../../services/pet';

@Component({
  selector: 'app-lost',
  imports: [FormsModule],
  templateUrl: './lost.html',
  styleUrl: './lost.css',
  encapsulation: ViewEncapsulation.None
})
export class Lost implements OnInit {
  formType = 'lost';
  submitted = false;
  showModal = false;
  previewUrl: string | null = null;
  sortBy = 'newest';
  lostPets: any[] = [];

  constructor(private petService: PetService, private cdr: ChangeDetectorRef) {}

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

  ngOnInit() {
    this.loadLostPets();
  }

  loadLostPets() {
    this.petService.getLostPets().subscribe({
      next: (data) => {
        this.lostPets = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  get sortedPets() {
    return [...this.lostPets].sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt).getTime();
      const dateB = new Date(b.date || b.createdAt).getTime();
      return this.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
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
    this.petForm = {
      name: '', type: 'Dog', breed: '', color: '',
      gender: 'Male', location: '', date: '', description: '', contact: ''
    };
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

  onSubmit() {
    const pet = {
      ...this.petForm,
      status: 'lost',
      image: this.previewUrl || ''
    };

    this.petService.saveLostPet(pet).subscribe({
      next: () => {
        this.submitted = true;
        this.cdr.detectChanges();
        this.loadLostPets();
        setTimeout(() => this.closeModal(), 2500);
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong. Please try again.');
      }
    });
  }
}
