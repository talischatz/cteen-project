'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'El usuario debe tener al menos 2 caracteres',
  }),
  password: z.string().min(2, {
    message: 'La contraseña debe tener al menos 2 caracteres',
  }),
  remember_me: z.boolean().default(false).optional(),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      remember_me: false,
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="full-container flex items-start md:items-center justify-center">
      <div className="max-w-4xl md:border md:border-gray-100 md:rounded-md flex w-full mt-12 md:mt-0">
        <div className="w-[350px] h-[600px] relative hidden md:flex">
          <Image
            src={require('@/public/cteen_logo_sinfondo.png')}
            alt="cteen-logo"
            layout="fill"
          />
        </div>
        <div className="w-[400px] min-h-full md:min-h-[600px] px-2 flex items-center justify-center flex-col flex-1">
          <div className="w-full text-foreground text-center font-semibold text-3xl mb-8">
            Iniciar Sesión
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full px-2 md:px-10"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su usuario" {...field} />
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
                    <FormLabel>Contraseña</FormLabel>
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
              <FormField
                control={form.control}
                name="remember_me"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center space-x-2 w-full">
                      <Checkbox
                        id="remember-me"
                        {...field}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Recuérdame
                      </label>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Enviar
              </Button>
              <div className="flex mt-4 text-sm items-center justify-start gap-2 w-full font-medium">
                <p>¿No tienes una contraseña?</p>
                <Link
                  href="/register"
                  className="text-primary underline hover:no-underline"
                >
                  Registrarse
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
