import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { AvatarImage } from "@radix-ui/react-avatar";

import { cn } from "@meet/lib/utils";

import { Avatar, AvatarFallback } from "./ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant?: "botttsNeutral" | "initials";
}

const GeneratedAvatar = ({
  seed,
  className,
  variant = "botttsNeutral"
} : GeneratedAvatarProps) => {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>
        {seed.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
 
export default GeneratedAvatar;
