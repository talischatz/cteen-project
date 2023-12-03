'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivityFormSchema } from '@/validations/activityForm';
import { cn } from '@/lib/utils';
import Lottie from 'lottie-react';
import animationData from '@/public/animations/activity-animation.json';
import { format } from 'date-fns';
import { useState } from 'react'
import { auth, db } from '@/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import BannerActivities from '../bannerActivities/BannerActivities';
import ModalActivities from '../successful-activities-modal/ModalActivities';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';


function ActivityForm() {

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      activity_name: '',
      activity_date: '',
      activity_leader: '',
    },
    shouldFocusError: false,
  });



async function onSubmit(values) {
  try {
    const user = auth.currentUser;
    if (user) {
      
      if (!values.activity_name || !values.activity_date || !values.activity_leader) {
        setIsErrorPopupVisible(true); 
        return; 
      }

      const activityData = {
        activity_name: values.activity_name,
        activity_date: values.activity_date,
        activity_leader: values.activity_leader,
        userId: user.uid, 
        email: user.email
      };
      await addDoc(collection(db, 'activities'), activityData);

      const userDocRef =  doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentPoints = userData.points;
        const newPoints = currentPoints + 500;
      
        await updateDoc(userDocRef, { points: newPoints });
      
    
        dispatch(setUser({ ...userData, points: newPoints }));
      
    
        localStorage.setItem('userData', JSON.stringify({ ...userData, points: newPoints }));
      
        setIsSuccessModalVisible(true);
        console.log('Actividad creada y puntos actualizados.');
      } else {
        console.error('El documento del usuario no existe en Firestore.');
      }
    } else {
      console.error('Usuario no autenticado');
    }
  } catch (error) {
    console.error('Error al guardar la actividad y actualizar puntos:', error);
    setIsErrorPopupVisible(true);
  }
}


  return (
    <div className="w-full min-h-full h-full flex pt-4 pb-16 px-2 items-center justify-center flex-grow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:space-y-4 max-w-[464px] p-[23px] w-full mb-6 md:mb-0 relative h-full border border-gray-100 shadow-lg"
        >
          <div className="flex flex-col items-center justify-center">
            <Lottie
              animationData={animationData}
              loop={false}
              className="w-60 h-60 mx-auto"
            />
            <p className="text-primary font-semibold text-2xl -translate-y-20">
              Registrar una actividad
            </p>
          </div>
          <FormField
            control={form.control}
            name="activity_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Actividad</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese la actividad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="activity_date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="font-semibold">
                  Fecha de la actividad
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ejem: 01/01/2000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activity_leader"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Participante</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre del Participante de la actividad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-[30px]">
            <Button type="submit" className="w-full">Registrar</Button>
          </div>
        </form>
        </Form>
      {isSuccessModalVisible && <BannerActivities onClose={() => setIsSuccessModalVisible(false)} />}
      {isErrorPopupVisible && <ModalActivities onClose={() => setIsErrorPopupVisible(false)} />}
    </div>
  );
}

export default ActivityForm;
