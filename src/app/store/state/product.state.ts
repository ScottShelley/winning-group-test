import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { ProductState, reducer } from '@store/reducer/product.reducer';


export interface AppState {
  // product: ProductState
}

export const reducers: ActionReducerMap<AppState> = {
  product: reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
