import { Dispatch, SetStateAction } from "react";

import { CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@meet/components/ui/command";

type DashboardCommandProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardCommand = ({ open, setOpen } : DashboardCommandProps) => (
  <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
    <CommandInput 
      placeholder="Find a meeting or agent"
    />
    <CommandList>
      <CommandItem>
        Test
      </CommandItem>
    </CommandList>
  </CommandResponsiveDialog>
);
 
export default DashboardCommand;
