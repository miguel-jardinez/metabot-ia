"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { DataTable } from "@meet/components/data-table";
import EmptyState from "@meet/components/empty-state";
import { useTRPC } from "@meet/trpc/client";

import useAgentFilters from "../../hooks/use-agents-filter";
import { columns } from "../components/columns";
import DataPagination from "../components/data-pagination";

const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentFilters();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable 
        data={data.items} 
        columns={columns} 
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination 
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {
        data.items.length === 0 && <EmptyState title="Create your first agent" description="Create and agent to join your meeting. Each agent will follow yout instructions and can interact with participants during the call" />
      }
    </div>
  );
};
 
export default AgentsView;
