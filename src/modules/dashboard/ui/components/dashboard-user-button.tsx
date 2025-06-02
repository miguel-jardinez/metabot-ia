import { useCallback } from "react";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import GeneratedAvatar from "@meet/components/generated-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@meet/components/ui/avatar";
import { Button } from "@meet/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@meet/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@meet/components/ui/dropdown-menu";
import { useIsMobile } from "@meet/hooks/use-mobile";
import { authClient } from "@meet/utils/auth-client";

const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = useCallback(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (error) => {
          console.error("Logout failed:", error);
        }
      }
    });
  }, [router]);

  if (isPending || !data) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden cursor-pointer gap-x-2">
          <>
            {
              data.user.image ? (
                <Avatar>
                  <AvatarFallback>
                    {data.user.name ? data.user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                  <AvatarImage
                    src={data.user.image}
                    alt={data.user.name || "User Avatar"}
                    className="object-cover" />
                </Avatar>
              ) : <GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 mr-3" />
            }
            <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
              <p className="text-sm truncate w-full">
                {data.user.name || "User"}
              </p>
              <p className="text-xs truncate w-full">
                {data.user.email}
              </p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0" />
          </>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {data.user.name || ""}
            </DrawerTitle>
            <DrawerDescription>
              {data.user.email || ""}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => {}}
            >
              <CreditCardIcon className="size-4" />
              Billing
            </Button>

            <Button
              variant="outline"
              onClick={onLogout}
            >
              <LogOutIcon className="size-4" />
              LogOut
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden cursor-pointer gap-x-2">
        {
          data.user.image ? (
            <Avatar>
              <AvatarFallback>
                {data.user.name ? data.user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
              <AvatarImage
                src={data.user.image}
                alt={data.user.name || "User Avatar"}
                className="object-cover" />
            </Avatar>
          ) : <GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 mr-3" />
        }
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">
            {data.user.name || "User"}
          </p>
          <p className="text-xs truncate w-full">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer flex items-center justify-between">
          LogOut
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
 
export default DashboardUserButton;
