import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgClass],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css'
})
export class Home {
  successStories = [
    {
      id: 1,
      emoji: '🐶',
      imgClass: 'img-teal',
      tag: 'Found',
      tagClass: 'tag-found',
      title: 'Max is home!',
      description: 'Max went missing for 3 days. Thanks to PawPaw, his family found him safe.',
      date: 'April 14, 2026'
    },
    {
      id: 2,
      emoji: '🐱',
      imgClass: 'img-purple',
      tag: 'Adopted',
      tagClass: 'tag-adopted',
      title: 'Luna found her family',
      description: 'Luna waited 2 months at a shelter. Today she has a warm home.',
      date: 'April 10, 2026'
    },
    {
      id: 3,
      emoji: '🐰',
      imgClass: 'img-amber',
      tag: 'Reunited',
      tagClass: 'tag-reunited',
      title: 'Bunny back with kids',
      description: 'A neighbor spotted the rabbit and reported it via PawPaw.',
      date: 'April 7, 2026'
    },
    {
      id: 4,
      emoji: '🐦',
      imgClass: 'img-pink',
      tag: 'Vet care',
      tagClass: 'tag-vet',
      title: 'Rocky recovered fully',
      description: 'His owner booked a vet in minutes through PawPaw.',
      date: 'April 3, 2026'
    }
  ];
}
