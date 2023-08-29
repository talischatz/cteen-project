import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordResetSchema } from '@/validations/passwordResetForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function PasswordResetForm({ setIsRecoveryMode, showBanner, setShowBanner }) {
  const form = useForm({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      otp: '',
      email: '',
      new_password: '',
      confirm_password: '',
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowBanner(false)
    }, 4000)
  }, [])

  const onSubmit = (values) => {
    // 1. Verificar el código OTP con el backend
    // 2. Si es correcto, permitir restablecer la contraseña
    // 3. Actualizar la contraseña del usuario en la base de datos
    console.log(values);
    setIsRecoveryMode(false);
  };

  return (
    <div className="w-full min-h-full h-full pt-4 px-2 flex flex-col items-start justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:space-y-4 w-full h-full mb-6 md:m-0 relative"
        >
          {/* Campo para ingresar el código OTP */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Código OTP</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el código OTP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo para ingresar el email del usuario */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese tu email de usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo para ingresar la nueva contraseña */}
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">
                  Nueva Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ingrese la nueva contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo para confirmar la nueva contraseña */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">
                  Confirme la Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme la nueva contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="w-full px-4 py-4 border border-green-400 bg-green-200 rounded text-sm text-gray-600 relative"
            >
              ¡Perfecto! 💪🏻 Te enviamos un código a tu email, lo necesitarás
              para resetear tu password.
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-2 right-2 text-green-600 hover:text-green-700"
              >
                <XCircle size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
          <div className="w-full md:absolute md:bottom-0 md:left-0">
            <Button type="submit" className="w-full">
              Restablecer Contraseña
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PasswordResetForm;
