import { Component, ChangeDetectorRef, HostListener, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PetService } from '../../../services/pet';

@Component({
  selector: 'app-have-for-adoption',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './have-for-adoption.html',
  styleUrls: ['./have-for-adoption.css']
})
export class HaveForAdoption implements OnInit {
  submitted = false;
  showModal = false;
  previewUrl: string | null = null;
  currentSlide = 0;
  visibleCount = 4;

  constructor(private petService: PetService, private cdr: ChangeDetectorRef) {}

  get slideWidth() { return 100 / this.visibleCount; }
  get maxSlide() { return this.adoptedStories.length - this.visibleCount; }
  get dots() { return Array.from({ length: this.maxSlide + 1 }, (_, i) => i); }

  @HostListener('window:resize')
  onResize() {
    const w = window.innerWidth;
    if (w < 576) this.visibleCount = 1;
    else if (w < 768) this.visibleCount = 2;
    else if (w < 992) this.visibleCount = 3;
    else this.visibleCount = 4;
    this.currentSlide = 0;
  }

  ngOnInit() { this.onResize(); }

  prevSlide() { if (this.currentSlide > 0) this.currentSlide--; }
  nextSlide() { if (this.currentSlide < this.maxSlide) this.currentSlide++; }
  goToSlide(i: number) { this.currentSlide = i; }

  adoptedStories = [
    { id: 1, emoji: '🐶', image: 'assets/images/succ1.jpg', tagClass: 'tag-found', tag: 'Adopted', title: 'Max found his home!', description: 'Max was listed on PawPaw and found a loving family within a week.', date: 'April 14, 2026' },
    { id: 2, emoji: '🐱', image: 'assets/images/succ2.jpg', tagClass: 'tag-adopted', tag: 'Adopted', title: 'Luna is home', description: 'Luna waited 2 months. Thanks to PawPaw she now has a warm family.', date: 'April 10, 2026' },
    { id: 3, emoji: '🐕', image: 'assets/images/succ3.jpg', tagClass: 'tag-found', tag: 'Adopted', title: 'Buddy got lucky', description: 'Buddy was adopted by a wonderful family through PawPaw.', date: 'March 28, 2026' },
    { id: 4, emoji: '🐈', image: 'assets/images/succ4.jpg', tagClass: 'tag-adopted', tag: 'Adopted', title: 'Piper forever home', description: 'After months in shelter, Piper finally has a loving forever home.', date: 'March 22, 2026' },
    { id: 5, emoji: '🐦', image: 'assets/images/succ5.jpg', tagClass: 'tag-reunited', tag: 'Adopted', title: 'Coco & her family', description: 'Coco was listed and adopted in just 3 days through PawPaw.', date: 'March 5, 2026' },
    { id: 6, emoji: '🐾', image: 'assets/images/succ6.jpg', tagClass: 'tag-adopted', tag: 'Adopted', title: 'Bella found her people', description: 'Bella was shy at first but her new family gave her all the love she needed.', date: 'February 28, 2026' },
    { id: 7, emoji: '🐾', image: 'assets/images/succ7.jpg', tagClass: 'tag-found', tag: 'Adopted', title: 'Rocky has a new yard', description: 'Rocky now runs freely in his new family\'s garden every single day.', date: 'February 20, 2026' },
    { id: 8, emoji: '🐦', image: 'assets/images/succ8.jpg', tagClass: 'tag-vet', tag: 'Adopted', title: 'Kiwi flew to safety', description: 'Kiwi was rescued and placed with a family who adores birds.', date: 'February 14, 2026' },
    { id: 9, emoji: '🐾', image: 'assets/images/succ9.jpg', tagClass: 'tag-reunited', tag: 'Adopted', title: 'Milo settled in', description: 'Milo spent 3 months waiting — now he has the perfect cozy home.', date: 'February 5, 2026' },
  ];

  petForm = {
    name: '', type: '', breed: '', age: '', color: '', description: '', contact: ''
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
    const pet = { ...this.petForm, status: 'adoption', image: this.previewUrl || '' };
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
