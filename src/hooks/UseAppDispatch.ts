import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../App/Store';

export const useAppDispatch = () => useDispatch<AppDispatch>();