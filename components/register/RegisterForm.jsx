'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { SignupFormSchema } from '@/validations/signupForm';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/firebase';
import ModalRegistration from '../successful-registration-modal/ModalRegistration';
import { useState } from 'react';


export default function RegisterForm() {

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      born_date: '',
      email: '',
      password: '',
    },
    shouldFocusError: false
  });

  async function onSubmit(values) {
    try {

      const docRef = await addDoc(collection(db, "users"), {
        first_name: values.first_name,
        last_name: values.last_name,
        born_date: values.born_date,
        email: values.email,
        password: values.password
      });
      console.log("Documento añadido con ID: ", docRef.id);
      setIsSuccessModalVisible(true);
    } catch (error) {
      console.error("Error al añadir documento: ", error);
    }
  }

  return (
    <div className="w-full min-h-full h-full pt-4 px-2 flex flex-col items-start justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:space-y-4 w-full mb-6 md:mb-0 relative h-full"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="born_date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="font-semibold">
                  Fecha de nacimiento
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'P')
                        ) : (
                          <span>Elige una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese su correo electrónico"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full lg:mt-16 md:absolute md:left-0 '>
            <Button type="submit" className="w-full" onClick={form.handleSubmit(onSubmit)}>
             Registrarse
            </Button>
          </div>
        </form>
      </Form>
      {isSuccessModalVisible && <ModalRegistration onClose={() => setIsSuccessModalVisible(false)} />}
    </div>
  );
}