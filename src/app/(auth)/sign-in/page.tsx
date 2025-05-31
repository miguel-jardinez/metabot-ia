import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignInView from "@meet/modules/auth/ui/views/sign-in-view";
import { auth } from "@meet/utils/auth";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if(!!session) {
    redirect("/");
  }

  return <SignInView />;
};
 
export default Page;
