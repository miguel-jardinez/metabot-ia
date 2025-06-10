"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { DataTable } from "@meet/components/data-table";
import EmptyState from "@meet/components/empty-state";
import useAgentFilters from "@meet/modules/agents/hooks/use-agents-filter";
import { useTRPC } from "@meet/trpc/client";

import { columns } from "../components/columns";

const MeetingsView = () => {
  const [filters] = useAgentFilters();
  const trpc = useTRPC();
  
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />
      {
        data.items.length === 0 && <EmptyState title="Create your first Meeting" description="Schedule a meeting to connect with other. Each meeting lets you collaborate, share ideas, and interact with participans in real time." />
      }
    </div>
  );
};
 
export default MeetingsView;
