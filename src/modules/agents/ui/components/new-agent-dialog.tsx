import ResponsiveDialog, { ResponsiveDialogControls } from "@meet/components/responsive-dialog";

import NewAgentForm from "./new-agent-form";

type NewAgentDialogProps = {} & ResponsiveDialogControls;

const NewAgentDialog = ({ open, onOpenChange } : NewAgentDialogProps) => (
  <ResponsiveDialog
    title="New Agent"
    description="Create a new agent to automate tasks and workflows."
    open={open}
    onOpenChange={onOpenChange}
  >
    <NewAgentForm onCancel={() => onOpenChange(false)} onSuccess={() => onOpenChange(false)} />
  </ResponsiveDialog>
);
 
export default NewAgentDialog;
