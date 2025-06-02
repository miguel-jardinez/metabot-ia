"use client";

import { Button } from "@meet/components/ui/button";
import { authClient } from "@meet/utils/auth-client";

const HomeView = () => {
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div>
        You are not logged in
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as {session?.user.name}</p>
      <Button onClick={() => authClient.signOut()} className="mt-4">
        Sign out
      </Button>
    </div>
  );
};
 
export default HomeView;
