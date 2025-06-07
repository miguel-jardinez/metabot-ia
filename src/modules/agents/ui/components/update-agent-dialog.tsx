import ResponsiveDialog, { ResponsiveDialogControls } from "@meet/components/responsive-dialog";

import { AgentGetOne } from "../../types";
import NewAgentForm from "./new-agent-form";

type UpdateAgentDialogProps = {
  initialValues: AgentGetOne
} & ResponsiveDialogControls;

const UpdateAgentDialog = ({ open, onOpenChange, initialValues } : UpdateAgentDialogProps) => (
  <ResponsiveDialog
    title="Edit Agent"
    description="Editthe agent details"
    open={open}
    onOpenChange={onOpenChange}
  >
    <NewAgentForm initialData={initialValues} onCancel={() => onOpenChange(false)} onSuccess={() => onOpenChange(false)} />
  </ResponsiveDialog>
);
 
export default UpdateAgentDialog;
