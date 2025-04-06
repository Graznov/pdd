import {useDispatch} from "react-redux";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppDispatch, AppState} from './store.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector:TypedUseSelectorHook<AppState>= useSelector
