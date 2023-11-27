"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SignupFormSchema } from "@/validations/signupForm";
import { auth, db } from "@/firebase";
import ModalRegistration from "../successful-registration-modal/ModalRegistration";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "@/redux/slices/userSlice";

export default function RegisterForm() {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  // const user = useSelector(selectUserData);

  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      born_date: "",
      email: "",
      password: "",
    },
    shouldFocusError: false,
  });

  async function onSubmit(values) {
    console.log("Datos del usuario a almacenar:", values);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      console.log("user: ", user);

      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        await setDoc(userDocRef, {
          first_name: values.first_name,
          last_name: values.last_name,
          address: values.address,
          born_date: values.born_date,
          email: values.email,
          points: 500,
        });

        console.log("Usuario creado con ID: ", user.uid);
        setIsSuccessModalVisible(true);
      }
    } catch (error) {
      console.error("Error al crear usuario: ", error);
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
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su dirección" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="born_date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">
                  Fecha de nacimiento
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ingrese su fecha de nacimiento"
                    {...field}
                  />
                </FormControl>
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
          <div className="w-full lg:mt-16 md:absolute md:left-0 ">
            <Button
              type="submit"
              className="w-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              Registrarse
            </Button>
          </div>
        </form>
      </Form>
      {isSuccessModalVisible && (
        <ModalRegistration onClose={() => setIsSuccessModalVisible(false)} />
      )}
    </div>
  );
}
