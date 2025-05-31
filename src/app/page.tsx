import { headers } from "next/headers";
import { redirect } from "next/navigation";

import HomeView from "@meet/modules/home/ui/views/home-view";
import { auth } from "@meet/utils/auth";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!session) {
    redirect("/sign-in");
  }

  return <HomeView />;
};
 
export default Page;
