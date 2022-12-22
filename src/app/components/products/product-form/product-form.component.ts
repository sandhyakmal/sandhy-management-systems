import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/i-product';
import { ProductService } from 'src/app/services/product.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  showMore: boolean = false;
  showToast: boolean = false;
  isDeleted: boolean = false;
  
  @Input() product: IProduct = {} as IProduct;

  constructor(private productService: ProductService, 
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
  }

  showToggle(){
    this.showMore = !this.showMore;
  }

  cancel(){
    this.showMore = false;
    this.product = {} as IProduct;
  }

  onCreate(){
    this.productService.create(this.product)
    .subscribe(
      (
      response: IProduct)=>{
        this.showMore = false;
        this.product = {} as IProduct;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil input data ${response.title}`;
      }
    );
  }

  onUpdate(){
    this.productService.update(this.product)
    .subscribe(
      (
      response: IProduct) => {
        this.showMore = false;
        this.product = {} as IProduct;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil Edit data ${response.title}`;
      }
    );
  }

  onDelete(){
    this.productService.delete(this.product)
    .subscribe(
      (
      response: IProduct) => {
        this.showMore = false;
        this.product = {} as IProduct;
        this.toasterService.showToast = true;
        this.toasterService.message = `Berhasil Hapus data ${response.title}`;
        this.isDeleted = false; 
      }
    );
  }

}
