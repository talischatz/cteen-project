// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import axiosInstance from '@/lib/axiosInstance';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { PasswordResetSchema } from '@/validations/passwordResetForm';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { XCircle } from 'lucide-react';
// import { useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { checkActionCode, applyActionCode, sendPasswordResetEmail } from "firebase/auth";
// import { auth } from '@/firebase';



// function PasswordResetForm({ setIsRecoveryMode, showBanner, setShowBanner }) {
//   const form = useForm({
//     resolver: zodResolver(PasswordResetSchema),
//     defaultValues: {
//       // otp: '',
//       recovery_email: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//     shouldFocusError: false,
//   });

//   useEffect(() => {
//     setTimeout(() => {
//       setShowBanner(false)
//     }, 4000)
//   }, [])

//   const onSubmit = async (values) => {
//     console.log('Submit button clicked in PasswordResetForm');
//     console.log('Email a enviar:', values.recovery_email);
//     try {
//       // Enviar correo de restablecimiento de contraseña usando Firebase
//       await sendPasswordResetEmail(auth, values.recovery_email);
//       // Correo enviado con éxito, muestra el banner y realiza otras acciones necesarias
//       setShowBanner(true);
//     } catch (error) {
//       // Maneja errores de envío de correo electrónico
//       console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error);
//     }
//   };


  

//   return (
//     <div className="w-full min-h-full h-full pt-4 px-2 flex flex-col items-start justify-between">
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-8 md:space-y-4 w-full h-full mb-6 md:m-0 relative"
//         >
//           {/* Campo para ingresar el email del usuario */}
//           <FormField
//             control={form.control}
//             name="recovery_email"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel className="font-semibold">Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ingrese tu email de usuario" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Campo para ingresar la nueva contraseña */}
//           <FormField
//             control={form.control}
//             name="newPassword"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel className="font-semibold">
//                   Nueva Contraseña
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Ingrese la nueva contraseña"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Campo para confirmar la nueva contraseña */}
//           <FormField
//             control={form.control}
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormLabel className="font-semibold">
//                   Confirme la Contraseña
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="password"
//                     placeholder="Confirme la nueva contraseña"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <AnimatePresence>
//             {showBanner && (
//               <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 50 }}
//                 className="w-full px-4 py-4 border border-green-400 bg-green-200 rounded text-sm text-gray-600 relative"
//               >
//                 ¡Perfecto! 💪🏻 Te enviamos un correo electrónico con un enlace para restablecer tu contraseña.
//                 <button
//                   onClick={() => setShowBanner(false)}
//                   className="absolute top-2 right-2 text-green-600 hover:text-green-700"
//                 >
//                   <XCircle size={16} />
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <div className="w-full md:absolute md:bottom-0 md:left-0">
//             <Button type="submit" className="w-full">
//               Restablecer Contraseña
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }


// export default PasswordResetForm;