import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  // errorMessage: string;

  displayCode: boolean;

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  // sub: Subscription;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    // Original
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // TODO: Unsubscribe
    //New
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    /* New */
    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts());

    /* Original */
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.errorMessage$ = this.store.select(getError);

    // TODO: Unsubscribe
    this.displayCode$ = this.store.select(getShowProductCode)
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
