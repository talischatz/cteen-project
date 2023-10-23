'use client';

import ActivityForm from "@/components/activities/ActivityForm";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromLocalStorage } from '@/redux/slices/userSlice'; 

export default function ActivitiesPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
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
