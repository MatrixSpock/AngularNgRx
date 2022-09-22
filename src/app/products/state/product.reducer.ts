import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import { ProductApiActions, ProductPageActions } from './actions';
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
}

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, data): ProductState => {
    return {
      ...state,
      currentProductId: data.currentProductId
    }
  }),
  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductApiActions.loadProductsSuccess, (state, data): ProductState => {
    return {
      ...state,
      products: data.products,
      error: ''
    }
  }),
  on(ProductApiActions.loadProductsFailure, (state, data): ProductState => {
    return {
      ...state,
      products: [],
      error: data.error
    }
  }),
  on(ProductApiActions.updateProductSuccess, (state, data): ProductState => {
    const updateProducts = state.products.map(item => data.product.id === item.id ? data.product : item);
    return {
      ...state,
      products: updateProducts,
      currentProductId: data.product.id,
      error: ''
    }
  }),
  on(ProductApiActions.updateProductFailure, (state, data): ProductState => {
    return {
      ...state,
      error: data.error
    }
  }),
  //JRI Deleting
  on(ProductApiActions.deleteProductSuccess, (state, data): ProductState => {
    return {
      ...state,
      products: state.products.filter(product => product.id !== data.productId),
      currentProductId: null,
      error: ''
    }
  }),
  on(ProductApiActions.deleteProductFailure, (state, data): ProductState => {
    return {
      ...state,
      error: data.error
    }
  }),
  //JRI Create Reducer
  on(ProductApiActions.createProductSuccess, (state, data): ProductState => {
    return {
      ...state,
      products: [...state.products, data.product],
      currentProductId: data.product.id,
      error: ''
    }
  }),
  on(ProductApiActions.createProductFailure, (state, data): ProductState => {
    return {
      ...state,
      error: data.error
    }
  })

);
