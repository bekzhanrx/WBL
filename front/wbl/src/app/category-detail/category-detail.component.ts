import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Category} from "../models";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category-detail',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        ReactiveFormsModule,
      RouterModule
    ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent implements OnInit{
  cat!: Category
  loaded: boolean = false;
  slides = [
    { image: '../assets/img/banner1.png', alt: 'Slide 1' },
    { image: '../assets/img/banner2.jpg', alt: 'Slide 2' },
    { image: '../assets/img/banner3.jpg', alt: 'Slide 3' }
  ];
  currentSlideIndex = 0;
  constructor(private route: ActivatedRoute,
              private catService: CategoryService) {
  }

  ngOnInit() {
    this.getCat()
    this.showSlides()
  }

  getCat(){
    this.route.paramMap.subscribe((params)=>{
      const catId: number = Number(params.get('categoryId'));
      this.loaded = false;
      this.catService.getCategory(catId).subscribe((category)=>{
        this.cat = category;
        this.loaded = true;
      })
    })
  }

  showSlides() {
    setInterval(() => {
      this.currentSlideIndex++;
      if (this.currentSlideIndex === this.slides.length) {
        this.currentSlideIndex = 0;
      }
    }, 3000); // Измените значение 2000 на нужное вам время между слайдами (в миллисекундах)
  }
}
