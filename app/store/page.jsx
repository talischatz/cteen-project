'use client';

import ProductsList from "@/components/products-list/ProductsList";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from '@/redux/slices/userSlice'; 

export default function StorePage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="full-container">
      <div className="text-4xl text-primary font-semibold mt-8 text-center">Store</div>
      <ProductsList />
    </div>
  );
}
