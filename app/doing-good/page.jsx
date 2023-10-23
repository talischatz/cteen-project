"use client";

import DoingGoodForm from '@/components/doing-good/DoingGoodForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from '@/redux/slices/userSlice'; 

export default function DoingGoodPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  
  return (
    <div className="full-container flex flex-col">
      <div className="text-4xl text-primary font-semibold mt-8 text-center">
        Doing Good
      </div>
      <DoingGoodForm />
    </div>
  );
}
