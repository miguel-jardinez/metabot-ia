"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Alert, AlertTitle } from "@meet/components/ui/alert";
import { Button } from "@meet/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@meet/components/ui/form";
import { Input } from "@meet/components/ui/input";
import { authClient } from "@meet/utils/auth-client";

import { registerSchema, RegisterSchemaType } from "../schema/auth-schema";

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password
    }, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        console.error("Registration failed:", error);
      },
      onRequest: () => {
        setIsLoading(true);
        setError(null);
      }
    });
  }, []);

  const handleSignInWithSocial = useCallback((provider: "github" | "google") => {
    authClient.signIn.social({
      provider,
      callbackURL: "/"
    }, {
      onSuccess: () => {
        setError(null);
        setIsLoading(false);
      },
      onError: ({ error }) => {
        setError(error.message || "Social login failed. Please try again.");
        setIsLoading(false);
      },
      onRequest: () => {
        setError(null);
        setIsLoading(true);
      }
    });
  }, []);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">
              Welcom back
            </h1>
            <p className="text-muted-foreground text-balance">
              Login to your account
            </p>
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!!error && (
            <Alert className="bg-destructive/10 border-none">
              <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
              <AlertTitle>
                {error}
              </AlertTitle>
            </Alert>
          )}
          <Button disabled={isLoading} type="submit">Login</Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button disabled={isLoading} onClick={() => handleSignInWithSocial("google")} variant="outline" type="button" className="w-full">
              <FaGoogle />
              Google
            </Button>
            <Button disabled={isLoading} onClick={() => handleSignInWithSocial("github")} variant="outline" type="button" className="w-full">
              <FaGithub />
              Github
            </Button>
          </div>
          <div className="text-center text-sm">
            Do you have an account?{" "}<Link className="underline underline-offset-4 font-semibold text-green-700" href="/sign-in">Sign in</Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
 
export default SignUpForm;
