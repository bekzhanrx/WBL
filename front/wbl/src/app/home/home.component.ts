import {Component, OnInit} from '@angular/core';
import {NgFor, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Bus, Category} from "../models";
import {BusService} from "../bus.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  buses!: Bus[]
  logged: boolean = false;
  username: string = "";
  password: string = "";
  newBus: Bus = {
    id: 0, // Можете оставить 0, так как сервер Django присвоит id при создании
    category: 0,
    name: '',
    description: '',
    price: 0,
    img: '',
    user: null
  };
  updateId: number = 0;
  deleteId: number = 0;
  price: number = 0;
  updBus!: Bus;
  loaded: boolean = false
  slides = [
    { image: '../assets/img/banner1.png', alt: 'Slide 1' },
    { image: '../assets/img/banner2.jpg', alt: 'Slide 2' },
    { image: '../assets/img/banner3.jpg', alt: 'Slide 3' }
  ];
  currentSlideIndex = 0;
  constructor(private busService: BusService) {}

  ngOnInit(): void {
    this.showSlides();
    const access = localStorage.getItem("access");
    if(access){
      this.logged = true;
      this.getBuses();
    }
  }

  login(){
    this.busService.login(this.username, this.password).subscribe((data)=>{
      this.logged = true;
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      this.getBuses()
    })
  }

  logout(){
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh")
  }


  showSlides() {
    setInterval(() => {
      this.currentSlideIndex++;
      if (this.currentSlideIndex === this.slides.length) {
        this.currentSlideIndex = 0;
      }
    }, 3000); // Измените значение 2000 на нужное вам время между слайдами (в миллисекундах)
  }

  getBuses(){
    this.loaded = false
    this.busService.getBuses().subscribe((data)=>{
      this.buses = data;
      this.loaded = true;
    })
  }

  addBus() {
    this.busService.createBus(this.newBus).subscribe({
      next: (createdBus) => {
        console.log('Created bus:', createdBus);
        alert('Bus successfully created!');
        this.newBus = { // Очистка формы
          id: 0,
          category: 0,
          name: '',
          description: '',
          price: 0,
          img: '',
          user: null
        };
      },
      error: (error) => {
        console.error('Error creating bus:', error);
        alert('Error creating bus. Please try again.');
      }
    });

  }

  updateBus(){
    this.busService.getBus(this.updateId).subscribe((bus)=>{
      this.updBus = bus;
      this.updBus.price = this.price; // Установка свойства price после получения автобуса
      this.busService.updateBus(this.updBus).subscribe((updatedBus)=>{
        console.log('Updated bus:', updatedBus);
        alert('Bus successfully updated!');
      }, (error) => {
        console.error('Error updating bus:', error);
        alert('Error updating bus. Please try again.');
      });
    });
  }

  deleteBus(){
    this.buses = this.buses.filter((b)=>b.id != this.deleteId)
    this.busService.deleteBus(this.deleteId).subscribe(()=>{
      alert('Bus successfully deleted!')
    })
  }


}
