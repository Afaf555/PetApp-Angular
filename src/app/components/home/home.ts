import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  currentSlide = 0;
  visibleCount = 4;

  get slideWidth() {
    return 100 / this.visibleCount;
  }

  get maxSlide() {
    return this.successStories.length - this.visibleCount;
  }

  get dots() {
    return Array.from({ length: this.maxSlide + 1 }, (_, i) => i);
  }

  @HostListener('window:resize')
  onResize() {
    const w = window.innerWidth;
    if (w < 576) this.visibleCount = 1;
    else if (w < 768) this.visibleCount = 2;
    else if (w < 992) this.visibleCount = 3;
    else this.visibleCount = 4;
    this.currentSlide = 0;
  }

  ngOnInit() {
    this.onResize();
  }

  prevSlide() {
    if (this.currentSlide > 0) this.currentSlide--;
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlide) this.currentSlide++;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  adoptionPets = [
    { id: 1, name: 'Bella', image: 'assets/images/dog1.jpg' },
    { id: 2, name: 'Luna', image: 'assets/images/cat1.jpg' },
    { id: 3, name: 'Max', image: 'assets/images/dog2.jpg' },
    { id: 4, name: 'Milo', image: 'assets/images/cat2.jpg' },
  ];

  successStories = [
    { id: 1, image: 'assets/images/success1.jpg', topClass: 'sc-teal', tag: 'Found', tagClass: 'tag-found', title: 'Max is home!', description: 'Max went missing for 3 days. Thanks to PawPaw, his family found him safe.', date: 'April 14, 2026' },
    { id: 2, image: 'assets/images/success2.jpg', topClass: 'sc-purple', tag: 'Adopted', tagClass: 'tag-adopted', title: 'Luna found her family', description: 'Luna waited 2 months at a shelter. Today she has a warm home.', date: 'April 10, 2026' },
    { id: 3, image: 'assets/images/success3.jpg', topClass: 'sc-amber', tag: 'Reunited', tagClass: 'tag-reunited', title: 'Bunny back with kids', description: 'A neighbor spotted the rabbit and reported it via PawPaw.', date: 'April 7, 2026' },
    { id: 4, image: 'assets/images/success4.jpg', topClass: 'sc-pink', tag: 'Vet care', tagClass: 'tag-vet', title: 'Rocky recovered fully', description: 'His owner booked a vet in minutes through PawPaw.', date: 'April 3, 2026' },
    { id: 5, image: 'assets/images/success5.jpg', topClass: 'sc-teal', tag: 'Found', tagClass: 'tag-found', title: 'Buddy found after a week', description: 'Buddy was spotted by a neighbor who used PawPaw to report him.', date: 'March 28, 2026' },
    { id: 6, image: 'assets/images/success6.jpg', topClass: 'sc-purple', tag: 'Adopted', tagClass: 'tag-adopted', title: 'Piper got his forever home', description: 'After 3 months in a shelter, Milo finally has a loving family.', date: 'March 22, 2026' },
    { id: 7, image: 'assets/images/success7.webp', topClass: 'sc-amber', tag: 'Shopping', tagClass: 'tag-shop', title: 'First toy for little Rex', description: 'Rex\'s owner found the perfect toy through PawPaw\'s pet shop.', date: 'March 18, 2026' },
    { id: 8, image: 'assets/images/success8.jpg', topClass: 'sc-pink', tag: 'Vet care', tagClass: 'tag-vet', title: 'Bella\'s surgery was a success', description: 'Bella needed urgent care. Her owner booked a vet through PawPaw in minutes.', date: 'March 12, 2026' },
    { id: 9, image: 'assets/images/success9.jpg', topClass: 'sc-teal', tag: 'Reunited', tagClass: 'tag-reunited', title: 'Coco back with her family', description: 'Coco escaped the yard but was found thanks to PawPaw community.', date: 'March 5, 2026' },
  ];
}
