import { User } from '../user';

import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { LoginPageActions } from './actions';


export interface LoginState {
  maskUserName: boolean;
  currentUser: User
}

const initialState: LoginState = {
  maskUserName: false,
  currentUser: null
}

const getLoginFeatureState = createFeatureSelector<LoginState>('users')

export const getMaskUserName = createSelector(
  getLoginFeatureState,
  state => state.maskUserName
)

export const getCurrentUser = createSelector(
  getLoginFeatureState,
  state => state.currentUser
)

export const loginReducer = createReducer<LoginState>(
  initialState,
  on(LoginPageActions.maskUserName, (state): LoginState => {
    console.log("masking user name. Logging state: ", JSON.stringify(state) );
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);

