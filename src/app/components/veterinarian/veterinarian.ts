import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-vet-appointment',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './veterinarian.html',
  styleUrls: ['./veterinarian.css']
})
export class Veterinarian {

  submitted = false;
  selectedVet: any = null;

  clinicName = ' Veterinary Clinic';

  vets = [
    {
      id: 1,
      name: 'Dr. Marko Stojanov',
      speciality: 'Small Animals',
      description: 'Expert in dogs and cats with 8 years experience.',
      rating: 4.9,
      image: 'assets/images/vet1.jpg'
    },
    {
      id: 2,
      name: 'Dr. Ana Petrova',
      speciality: 'Surgery',
      description: 'Emergency & surgical specialist.',
      rating: 4.8,
      image: 'assets/images/vet2.jpg'
    },
    {
      id: 3,
      name: 'Dr. Elena Dimitrova',
      speciality: 'Dermatology',
      description: 'Skin and allergy treatments for pets.',
      rating: 4.7,
      image: 'assets/images/vet3.jpg'
    }
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

    console.log({
      clinic: this.clinicName,
      vet: this.selectedVet,
      ...this.appointmentForm
    });

    this.submitted = true;

    this.appointmentForm = {
      ownerName: '',
      petName: '',
      petType: 'Dog',
      service: 'Check-up',
      date: '',
      time: '',
      contact: ''
    };

    this.selectedVet = null;
  }

}
