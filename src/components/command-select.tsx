import { ReactNode, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@meet/lib/utils";

import { Button } from "./ui/button";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "./ui/command";

type CommandSelectProps = {
  options: Array<{
    id: string,
    value: string,
    children: ReactNode
  }>;
  onSelect: (value: string) => void
  onSearch: (value: string) => void
  value: string;
  placeholder: string;
  className?: string
};

const CommandSelect = ({ 
  options,
  onSearch,
  onSelect,
  value,
  className,
  placeholder = "Select an option"
} : CommandSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="button" variant="outline" className={cn("h-9 justify-between font-normal px-2", className, !selectedOption && "text-muted-foreground")}>
        <div className="">
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CommandInput placeholder="Search" onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty className="text-muted-foreground text-sm">
            <span>No options found</span>
          </CommandEmpty>
          {
            options.map((option) => (
              <CommandItem className="cursor-pointer" key={option.id} onSelect={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}>
                {option.children}
              </CommandItem>
            ))
          }
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
 
export default CommandSelect;
