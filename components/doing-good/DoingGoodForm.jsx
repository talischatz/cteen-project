'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Lottie from 'lottie-react';
import animationData from '@/public/animations/doing-good-animation.json';
import { useRef } from 'react';
import { useState } from 'react';
import ModalDoingGood from '../successful-doingGood-modal/ModalDoingGood';

export default function DoingGoodForm() {

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const lottieRef = useRef(null);
  const form = useForm({
    defaultValues: {
      upload_file: '',
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
          <div className="flex flex-col items-center justify-center mb-12">
            <Lottie
              animationData={animationData}
              loop={false}
              className="w-60 h-60 mx-auto"
              lottieRef={lottieRef}
              onComplete={() => lottieRef.current.goToAndStop(19, true)}
            />
            <p className="text-primary font-semibold text-2xl">
              Continue doing good
            </p>
          </div>
          <FormField 
            control={form.control}
            name="upload_file"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Subir archivo</FormLabel>
                <FormControl className="cursor-pointer">
                  <Input placeholder="Cargar archivo" type="file" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full">
            <Button type="submit" className="w-full">
              Subir archivo
            </Button>
          </div>
        </form>
      </Form>
      {isSuccessModalVisible && <ModalDoingGood onClose={() => setIsSuccessModalVisible(false)} />}
    </div>
  );
}
