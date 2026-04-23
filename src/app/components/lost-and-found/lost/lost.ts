import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PetService } from '../../../services/pet';

@Component({
  selector: 'app-lost',
  imports: [FormsModule],
  templateUrl: './lost.html',
  styleUrl: './lost.css',
  encapsulation: ViewEncapsulation.None
})
export class Lost {
  formType = 'lost';
  submitted = false;
  showModal = false;
  previewUrl: string | null = null;
  sortBy = 'newest';
  lostPets: any[] = [];

  constructor(private petService: PetService, private cdr: ChangeDetectorRef) {}

  petForm = {
    name: '',
    type: '',
    breed: '',
    color: '',
    gender: '',
    location: '',
    date: '',
    description: '',
    contact: ''
  };

  lostPetsStatic = [
    { id: 1, name: 'Cony', age: '3 y.o.', description: 'loves to play', image: 'assets/images/cat3.jpg', date: '2026-04-22' },
    { id: 2, name: 'Martin', age: '1 y.o.', description: 'mix of butter', image: 'assets/images/cat4.jpg', date: '2026-04-20' },
    { id: 3, name: 'Max', age: '2 y.o.', description: 'loves making friends', image: 'assets/images/dog3.jpg', date: '2026-04-18' },
    { id: 4, name: 'Lesley', age: '8 m.o.', description: 'loves walking freely', image: 'assets/images/dog4.jpg', date: '2026-04-15' },
  ];

  ngOnInit() {
    this.loadLostPets();
  }

  loadLostPets() {
    this.petService.getLostPets().subscribe({
      next: (data) => {
        this.lostPets = data.length > 0 ? data : this.lostPetsStatic;
        this.cdr.detectChanges();
      },
      error: () => {
        this.lostPets = this.lostPetsStatic;
        this.cdr.detectChanges();
      }
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
      name: '', type: '', breed: '', color: '',
      gender: '', location: '', date: '', description: '', contact: ''
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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.cdr.detectChanges();
      return;
    }

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
