"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import EmptyState from "@meet/components/empty-state";
import { useTRPC } from "@meet/trpc/client";

import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />
      {
        data.length === 0 && <EmptyState title="Create your first agent" description="Create and agent to join your meeting. Each agent will follow yout instructions and can interact with participants during the call" />
      }
    </div>
  );
};
 
export default AgentsView;
