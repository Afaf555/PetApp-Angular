import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-vet-appointment',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './veterinarian.html',
  styleUrls: ['./veterinarian.css']
})
export class Veterinarian implements AfterViewInit {

  submitted = false;
  selectedVet: any = null;
  clinicName = 'Veterinary Clinic';

  vets = [
    { id: 1, name: 'Dr. Marko Stojanov', speciality: 'Small Animals', description: 'Expert in dogs and cats with 8 years experience.', rating: 4.9, image: 'assets/images/vet1.jpg' },
    { id: 2, name: 'Dr. Ana Petrova', speciality: 'Surgery', description: 'Emergency & surgical specialist.', rating: 4.8, image: 'assets/images/vet2.jpg' },
    { id: 3, name: 'Dr. Elena Dimitrova', speciality: 'Dermatology', description: 'Skin and allergy treatments for pets.', rating: 4.7, image: 'assets/images/vet3.jpg' }
  ];

  appointmentForm = {
    ownerName: '',
    petName: '',
    petType: 'Dog',
    service: 'Check-up',
    date: '',
    time: '',
    contact: ''
  };

  selectVet(vet: any) {
    this.selectedVet = vet;
  }

  onSubmit() {
    if (!this.appointmentForm.ownerName || !this.appointmentForm.date) {
      alert('Please fill required fields!');
      return;
    }
    this.submitted = true;
    this.appointmentForm = {
      ownerName: '', petName: '', petType: 'Dog',
      service: 'Check-up', date: '', time: '', contact: ''
    };
    this.selectedVet = null;
  }

  private mapInstance: any = null;

  ngAfterViewInit() {
    setTimeout(() => {
      const mapEl = document.getElementById('map');
      if (!mapEl || this.mapInstance) return;

      // Исчисти го div-от ако веќе има содржина
      (mapEl as any)._leaflet_id = null;

      this.mapInstance = L.map('map').setView([41.9981, 21.4254], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.mapInstance);

      const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const vets = [
        { name: 'Vet Service 1', coords: [41.9995, 21.4314] as [number,number], phone: '070-123-456', emergency: false },
        { name: 'Vet Service 2', coords: [41.9950, 21.4200] as [number,number], phone: '071-987-654', emergency: false },
        { name: 'Vet Service 3', coords: [42.0020, 21.4100] as [number,number], phone: '075-555-222', emergency: false },
        { name: 'Emergency Vet 24/7', coords: [41.9970, 21.4350] as [number,number], phone: '078-111-999', emergency: true }
      ];

      vets.forEach(vet => {
        L.marker(vet.coords, vet.emergency ? { icon: redIcon } : {})
          .addTo(this.mapInstance)
          .bindPopup(`
          <b>${vet.name}</b><br/>
          📞 <a href="tel:${vet.phone}">${vet.phone}</a>
          ${vet.emergency ? '<br/>🚨 <b>EMERGENCY 24/7</b>' : ''}
        `);
      });

      this.mapInstance.invalidateSize();
    }, 300);
  }
}
