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
import { Checkbox } from "@/components/ui/checkbox";
import { LoginFormSchema } from "@/validations/loginForm";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

export default function LoginForm({ onRequestRecovery }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]); 

  

  async function onSubmit(values) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      if (user) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", values.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const userData = querySnapshot.docs[0].data();
          console.log("Usuario autenticado:", userData);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              first_name: userData.first_name,
              email: userData.email,
            })
          );
          dispatch(
            setUser({ first_name: userData.first_name, email: userData.email })
          );
          router.push("/home");
        } 
      } 
    } catch (error) {
      console.error("Error al autenticar:", error);
      setError("Error al autenticar. Por favor, intenta de nuevo.");
    }
  }

  return (
    <div className="w-full min-h-full h-full pt-4 px-2 flex flex-col items-start justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:space-y-4 w-full h-full mb-6 md:m-0 relative"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold">Usuario</FormLabel>
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
          <div className="flex w-full items-center justify-between mt-6">
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
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold"
                    >
                      Recuérdame
                    </label>
                  </div>
                </FormItem>
              )}
            />
            <p
              onClick={() => onRequestRecovery()}
              className="text-xs text-primary font-semibold hover:underline w-full text-right cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          <div className="w-full">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
