import { Component, ViewEncapsulation, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PetService } from '../../../services/pet';

@Component({
  selector: 'app-found',
  imports: [FormsModule],
  templateUrl: './found.html',
  styleUrl: './found.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class Found implements OnInit {
  formType = 'found';
  submitted = false;
  showModal = false;
  previewUrl: string | null = null;
  sortBy = 'newest';
  foundPets: any[] = [];

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

  foundPetsStatic = [
    { id: 1, name: 'Unknown', age: '~2 y.o.', description: 'found near city park', image: 'assets/images/cat.jpg', date: '2026-04-22' },
    { id: 2, name: 'Unknown', age: '~1 y.o.', description: 'found on main street', image: 'assets/images/dog14.jpg', date: '2026-04-20' },
    { id: 3, name: 'Unknown', age: '~3 y.o.', description: 'found near school', image: 'assets/images/dog8.jpg', date: '2026-04-15' },
    { id: 4, name: 'Unknown', age: '~5 y.o.', description: 'found in neighborhood', image: 'assets/images/dog15.jpg', date: '2026-04-10' },
  ];

  ngOnInit() {
    this.loadFoundPets();
  }

  loadFoundPets() {
    this.petService.getFoundPets().subscribe({
      next: (data) => {
        this.foundPets = data.length > 0 ? data : this.foundPetsStatic;
        this.cdr.detectChanges();
      },
      error: () => {
        this.foundPets = this.foundPetsStatic;
        this.cdr.detectChanges();
      }
    });
  }

  get sortedPets() {
    return [...this.foundPets].sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt).getTime();
      const dateB = new Date(b.date || b.createdAt).getTime();
      return this.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/no-pet-image.jpg';
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
      Object.values(form.controls).forEach(c => c.markAsTouched());
      this.cdr.detectChanges();
      return;
    }

    const pet = {
      ...this.petForm,
      status: 'found',
      image: this.previewUrl || ''
    };

    this.petService.saveFoundPet(pet).subscribe({
      next: () => {
        this.submitted = true;
        this.cdr.detectChanges();
        this.loadFoundPets();
        setTimeout(() => this.closeModal(), 2500);
      },
      error: (err) => {
        console.error(err);
        alert('Something went wrong. Please try again.');
      }
    });
  }
}
