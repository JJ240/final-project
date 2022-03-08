import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : any;
  productForm!: FormGroup;
  constructor(private service: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl(),
    });
    this.service.getProduct().subscribe((res : any)=>{
      this.products = res.data;
    });
  }

  getProductByName(){
    let product = {
      productName: this.productForm.value.productName
    }
    this.service.getProductByName(product).subscribe((res : any)=>{
      this.products = res.data;
      this.router.navigateByUrl('/',{skipLocationChange:true})
      .then(()=> this.router.navigate(['/product']));
    });
  }

  deleteProduct(id:any){
    if(confirm("Confirm Delete ?")){
      this.service.deleteProduct(id).subscribe((res)=>{
        this.router.navigateByUrl('/',{skipLocationChange:true})
        .then(()=> this.router.navigate(['/product']));
      });
    }
  }
}
