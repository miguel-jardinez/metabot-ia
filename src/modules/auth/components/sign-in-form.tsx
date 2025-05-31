"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Alert, AlertTitle } from "@meet/components/ui/alert";
import { Button } from "@meet/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@meet/components/ui/form";
import { Input } from "@meet/components/ui/input";
import { authClient } from "@meet/utils/auth-client";

import { loginSchema, LoginSchemaType } from "../schema/auth-schema";

const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = useCallback((data: LoginSchemaType) => {
    setError(null);
    setIsLoading(true);

    try {
      authClient.signIn.email({
        email: data.email,
        password: data.password
      }, {
        onSuccess: () => {
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message || "Login failed. Please try again.");
          setIsLoading(false);
        }
      });

    } catch {
      setError("Login failed. Please check your credentials and try again.");
    }
  }, [router]);
  
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
            <Button variant="outline" type="button" className="w-full">
              Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              Github
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}<Link className="underline underline-offset-4 font-semibold text-green-700" href="/sign-up">Sign up</Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
 
export default SignInForm;
