"use client";

import Image from "next/image";

import { Card, CardContent } from "@meet/components/ui/card";

import SignInForm from "../../components/sign-in-form";

const SignInView = () => (
  <div className="flex flex-col gap-6">
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <SignInForm />
        <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
          <Image src="/logo.svg" alt="Image" width={92} height={92} className="aspect-square" />
          <p className="text-2xl font-semibold text-white">
            Meet.AI
          </p>
        </div>
      </CardContent>
    </Card>

    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking Continue, you agreed  to our 
      <a href="/terms" className="font-semibold">Terms of Service</a> and 
      <a href="/privacy" className="font-semibold">Privacy Policy</a>.
    </div>
  </div>
);
 
export default SignInView;
