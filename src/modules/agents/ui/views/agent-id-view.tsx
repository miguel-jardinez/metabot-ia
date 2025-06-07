"use client";

import { useCallback, useState } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import GeneratedAvatar from "@meet/components/generated-avatar";
import { Badge } from "@meet/components/ui/badge";
import { useTRPC } from "@meet/trpc/client";

import useConfirm from "../../hooks/use-confirm";
import AgentIdViewHeader from "../components/agent-id-view-header";
import UpdateAgentDialog from "../components/update-agent-dialog";

type AgentIdViewProps = {
  agentId: string
};

const AgentIdView = ({ agentId } : AgentIdViewProps) => {
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }));
  const queryClient = useQueryClient();
  const [updateAgentDialog, setUpdateAgentDialog] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm({ title: "Are you sure?", description: `The following action will remove agent ${data.name} and can not be reverted` });

  const removeAgent = useMutation(
    trpc
      .agents
      .delete
      .mutationOptions({ 
        onSuccess: () => {
          queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
          // TODO: Invalid free tier usage
          router.push("/agents");
        },
        onError: (error) => {
          toast.error(error.message);
        }
      })
  );

  const handleRemoveAgent = useCallback(async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  }, [agentId, confirmRemove, removeAgent]);

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog open={updateAgentDialog} onOpenChange={setUpdateAgentDialog} initialValues={data} />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader 
          agentId={agentId}
          name={data.name}
          onEdit={() => setUpdateAgentDialog(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar 
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">
                {data.name}
              </h2>
            </div>
            <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
              <VideoIcon className="text-blue-700" />
              {data.meetingCount} Meetings
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-xl font-medium">Instructions:</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
};
 
export default AgentIdView;
