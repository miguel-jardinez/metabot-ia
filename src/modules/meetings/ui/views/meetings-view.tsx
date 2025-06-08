"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import useAgentFilters from "@meet/modules/agents/hooks/use-agents-filter";
import { useTRPC } from "@meet/trpc/client";

const MeetingsView = () => {
  const [filters] = useAgentFilters();
  const trpc = useTRPC();
  
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      Meetings view {JSON.stringify(data, null, 2)}
    </div>
  );
};
 
export default MeetingsView;
