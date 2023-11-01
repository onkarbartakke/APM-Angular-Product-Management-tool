import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls : ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle: string = 'Product List';
  imageWidth : number = 50;
  imageMargin : number = 2;
  showImage : boolean = true;
  private _listFilter : string = ' ';
  errorMessage : string = '';
  sub! : Subscription ;

  get listFilter(): string{
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value;
    console.log("In setter : "+this._listFilter);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts : IProduct[] = [];

  products: IProduct[] = [];

  constructor(private productService : ProductService){

  }

  toggleImage() : void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
            this.products = products;
            this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
     // this.filteredProducts = this.products;
      console.log("Start");
     // this.listFilter = 'cart';
  }

  performFilter(filterBy : string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product : IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message : string) : void {
    this.pageTitle = 'Product List: ' + message;
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
