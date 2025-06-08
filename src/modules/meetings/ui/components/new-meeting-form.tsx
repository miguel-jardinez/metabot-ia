import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import CommandSelect from "@meet/components/command-select";
import GeneratedAvatar from "@meet/components/generated-avatar";
import { Button } from "@meet/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@meet/components/ui/form";
import { Input } from "@meet/components/ui/input";
import NewAgentDialog from "@meet/modules/agents/ui/components/new-agent-dialog";
import { useTRPC } from "@meet/trpc/client";

import { CreateAgentSchema, createMeetingSchema } from "../../schemas";
import { MeetingGetOne } from "../../types";

type NewAgentFormProps = {
  onSuccess?: (id: string) => void;
  onCancel?: () => void;
  initialData?: MeetingGetOne;
};

const NewMeetingtForm = ({ onSuccess, onCancel, initialData } : NewAgentFormProps) => {
  const [meetingSearch, setMeetingSearch] = useState("");
  const [openAgentDialog, setOpenAgentDialog] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: agents } = useQuery(trpc.agents.getMany.queryOptions({ pageSize: 100, search: meetingSearch }));
  
  const form = useForm<CreateAgentSchema>({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      name: initialData?.name || "",
      agentId: initialData?.agentId || ""
    }
  });

  const onCreateMeeting = useMutation(trpc.meetings.create.mutationOptions({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

      onSuccess?.(data.id);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  }));

  const onUpdateMeeting = useMutation(trpc.meetings.update.mutationOptions({
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

      if (initialData?.id) {
        await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialData.id }));
      }

      onSuccess?.(data.id);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  }));

  const isEdit = Boolean(initialData?.id);
  const isPending = onCreateMeeting.isPending || onUpdateMeeting.isPending;

  const onSubmit = useCallback(async (data: CreateAgentSchema) => {
    if (isEdit && initialData) {
      onUpdateMeeting.mutate({ ...data, id: initialData.id });
    } else {
      onCreateMeeting.mutate(data);
    }
  }, [initialData, isEdit, onCreateMeeting, onUpdateMeeting]);

  return (
    <>
      <NewAgentDialog onOpenChange={setOpenAgentDialog} open={openAgentDialog} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField 
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter meeting name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect 
                    onSearch={setMeetingSearch}
                    onSelect={field.onChange}
                    value={field.value}
                    placeholder="Select an agent"
                    options={(agents?.items ?? []).map((agent) => ({ 
                      id: agent.id, 
                      value: agent.id, 
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar variant="botttsNeutral" seed={agent.name} className="border size-6" />
                          <span>{agent.name}</span>
                        </div>
                      )
                    }))}
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenAgentDialog(true)}
                  >
                    Create new agent
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            {
              onCancel && (
                <Button type="button" onClick={onCancel} variant="ghost" disabled={isPending} className="mr-2">
                  Cancel
                </Button>
              )
            }
            <Button type="submit" disabled={isPending}>
              { isEdit ? "Update" : "Create" }
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
 
export default NewMeetingtForm;
