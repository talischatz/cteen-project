'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordRecoverySchema } from '@/validations/passwordRecoveryForm';
import { Button } from '@/components/ui/button';

function PasswordRecoveryForm({ isRecoveryMode, setIsRecoveryMode }) {
  const form = useForm({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: {
      recovery_email: '',
    },
    shouldFocusError: false,
  });

  const onSubmit = (values) => {
    console.log(values);
    setIsRecoveryMode(false)
  };
  return (
    <div className="w-full min-h-full h-full pt-4 px-2 flex flex-col items-start justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:space-y-4 w-full h-full mb-6 md:m-0 relative"
        >
          <FormField
            control={form.control}
            name="recovery_email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese su email de recuperación"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full md:absolute md:bottom-0 md:left-0">
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PasswordRecoveryForm;
