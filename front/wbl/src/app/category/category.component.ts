import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {BusService} from "../bus.service";
import {Category} from "../models";
import {CategoryService} from "../category.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories!: Category[];
  loaded: boolean = false
  slides = [
    { image: '../assets/img/banner1.png', alt: 'Slide 1' },
    { image: '../assets/img/banner2.jpg', alt: 'Slide 2' },
    { image: '../assets/img/banner3.jpg', alt: 'Slide 3' }
  ];
  currentSlideIndex = 0;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.showSlides();
    this.getCategories();
  }
  showSlides() {
    setInterval(() => {
      this.currentSlideIndex++;
      if (this.currentSlideIndex === this.slides.length) {
        this.currentSlideIndex = 0;
      }
    }, 3000); // Измените значение 2000 на нужное вам время между слайдами (в миллисекундах)
  }

  getCategories(){
    this.loaded = false;
    this.categoryService.getCategories().subscribe((data)=>{
      this.categories = data;
      this.loaded = true;
    })
  }
}
