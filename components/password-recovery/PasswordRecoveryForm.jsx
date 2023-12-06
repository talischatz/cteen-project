"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordRecoverySchema } from "@/validations/passwordRecoveryForm";
import { Button } from "@/components/ui/button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useEffect } from "react";

function PasswordRecoveryForm({ onValidEmail, setShowBanner, showBanner }) {
 
  const form = useForm({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: {
      recovery_email: "",
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowBanner(false);
      window.location.reload();
    }, 8000); 
  }, [setShowBanner]);

  const onSubmit = async (values) => {
    console.log("Email a enviar:", values.recovery_email);
    try {

      await sendPasswordResetEmail(auth, values.recovery_email);
  
      setShowBanner(true);
    } catch (error) {

      console.error(
        "Error al enviar el correo electrónico de restablecimiento de contraseña:",
        error
      );
    }
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

          <AnimatePresence>
            {showBanner && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="w-full px-4 py-4 border border-green-400 bg-green-200 rounded text-sm text-gray-600 relative"
              >
                ¡Perfecto! 💪🏻 Te enviamos un correo electrónico con un enlace
                para restablecer tu contraseña.
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
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PasswordRecoveryForm;

// const onSubmit = (values) => {
//   axiosInstance.post('/auth/forget-password', {
//     email: values.recovery_email
//   })
//   .then(response => {
//     if (response.status === 200) {
//       onValidEmail(values.recovery_email);
//       setShowBanner(true)
//     } else {
//       console.error("Error en la respuesta del servidor", response);
//     }
//   })
//   .catch(error => {
//     console.error("Hubo un error al hacer la petición", error);
//   });
// };
