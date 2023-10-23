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
import { useState } from 'react';
import ModalActivities from '../successful-activities-modal/ModalActivities';


function ActivityForm() {

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      activity_name: '',
      activity_date: '',
      activity_leader: '',
    },
    shouldFocusError: false,
  });

  function onSubmit(values) {
    console.log(values);
    setIsSuccessModalVisible(true);
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
            name="activity_leader"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Lider</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre del lider de la actividad"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-[30px]">
            <Button className="w-full">Registrar</Button>
          </div>
        </form>
      </Form>
      {isSuccessModalVisible && <ModalActivities onClose={() => setIsSuccessModalVisible(false)} />}
    </div>
  );
}

export default ActivityForm;
