"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@meet/components/ui/form";
import { Input } from "@meet/components/ui/input";
import { Button } from "@meet/components/ui/button";

import { registerSchema, RegisterSchemaType } from "../schema/auth-schema";
import { authClient } from "@meet/utils/auth-client";

const RegisterForm = () => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const handleSubmit = useCallback(async(data: RegisterSchemaType) => {
    try {
      console.log("Form submitted with data:", data);

      authClient.signUp.email({
        email: data.email,
        name: data.name,
        password: data.password
      }, {
        onSuccess: (response) => {
          console.log("Registration successful:", response);
        },
        onError: (error) => {
          console.error("Registration failed:", error);
        }
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }, []);
  
  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="confirm password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};
 
export default RegisterForm;
