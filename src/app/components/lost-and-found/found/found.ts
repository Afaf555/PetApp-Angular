import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-found',
  imports: [FormsModule],
  templateUrl: './found.html',
  styleUrl: './found.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class Found {
  formType = 'found';
  submitted = false;
  showModal = false;
  previewUrl: string | null = null;
  sortBy = 'newest';

  constructor(private cdr: ChangeDetectorRef) {}

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

  foundPets = [
    { id: 1, name: 'Unknown', age: '~2 y.o.', description: 'found near city park', image: 'assets/images/cat.jpg', date: '2026-04-22' },
    { id: 2, name: 'Unknown', age: '~1 y.o.', description: 'found on main street', image: 'assets/images/dog14.jpg', date: '2026-04-20' },
    { id: 3, name: 'Unknown', age: '~3 y.o.', description: 'found near school', image: 'assets/images/dog8.jpg', date: '2026-04-15' },
    { id: 4, name: 'Unknown', age: '~5 y.o.', description: 'found in neighborhood', image: 'assets/images/dog15.jpg', date: '2026-04-10' },
  ];

  get sortedPets() {
    return [...this.foundPets].sort((a, b) =>
      this.sortBy === 'newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
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
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
        this.cdr.detectChanges();
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
    this.submitted = true;
    this.cdr.detectChanges();
    setTimeout(() => this.closeModal(), 2500);
  }
}
