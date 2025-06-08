import { useCallback } from "react";
import { useRouter } from "next/navigation";

import ResponsiveDialog, { ResponsiveDialogControls } from "@meet/components/responsive-dialog";

import NewMeetingForm from "./new-meeting-form";

type NewAgentDialogProps = {} & ResponsiveDialogControls;

const NewMeetingDialog = ({ open, onOpenChange } : NewAgentDialogProps) => {
  const router = useRouter();

  const onSuccess = useCallback((id: string) => {
    onOpenChange(false);
    router.push(`/meetings/${id}`);
  }, [onOpenChange, router]);

  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new meeting selection one of our agents."
      open={open}
      onOpenChange={onOpenChange}
    >
      <NewMeetingForm onCancel={() => onOpenChange(false)} onSuccess={onSuccess} />
    </ResponsiveDialog>
  );
};
 
export default NewMeetingDialog;
