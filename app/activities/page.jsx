'use client';

import ActivityForm from "@/components/activities/ActivityForm";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice'; 

export default function ActivitiesPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    console.log(storedUserData);
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      dispatch(setUser(userData));
    }
  }, [dispatch]);

  return (
    <div className="full-container flex flex-col">
      <div className="text-4xl text-primary font-semibold mt-8 text-center">
        Actividades
      </div>
      <ActivityForm />
    </div>
  );
}
