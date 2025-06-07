import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import GeneratedAvatar from "@meet/components/generated-avatar";
import { Button } from "@meet/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@meet/components/ui/form";
import { Input } from "@meet/components/ui/input";
import { Textarea } from "@meet/components/ui/textarea";
import { useTRPC } from "@meet/trpc/client";

import { createAgent, CreateAgentSchema } from "../../schemas";
import { AgentGetOne } from "../../types";

type NewAgentFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: AgentGetOne;
};

const NewAgentForm = ({ onSuccess, onCancel, initialData } : NewAgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  
  const form = useForm<CreateAgentSchema>({
    resolver: zodResolver(createAgent),
    defaultValues: {
      name: initialData?.name || "",
      instructions: initialData?.instructions || ""
    }
  });

  const onCreateAgent = useMutation(trpc.agents.create.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));

      if (initialData?.id) {
        await queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialData.id }));
      }

      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  }));

  const onUpdateAgent = useCallback(async (data: CreateAgentSchema) => {}, []);

  const isEdit = Boolean(initialData?.id);
  const isPending = onCreateAgent.isPending;

  const onSubmit = useCallback(async (data: CreateAgentSchema) => {
    if (isEdit) {
      await onUpdateAgent(data);
    } else {
      onCreateAgent.mutate(data);
    }
  }, [isEdit, onCreateAgent, onUpdateAgent]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <GeneratedAvatar variant="botttsNeutral" seed={form.watch("name")} className="border size-16" />
        <FormField 
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter agent name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpulf math assistant. Your job is to help users with their questions."
                />
              </FormControl>
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
  );
};
 
export default NewAgentForm;
