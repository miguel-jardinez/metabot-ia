import { Dispatch, SetStateAction } from "react";

import { CommandDialog, CommandInput, CommandItem, CommandList } from "@meet/components/ui/command";

type DashboardCommandProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardCommand = ({ open, setOpen } : DashboardCommandProps) => (
  <CommandDialog open={open} onOpenChange={setOpen}>
    <CommandInput 
      placeholder="Find a meeting or agent"
    />
    <CommandList>
      <CommandItem>
        Test
      </CommandItem>
    </CommandList>
  </CommandDialog>
);
 
export default DashboardCommand;
