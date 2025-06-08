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
    <div>
      Meetings view {JSON.stringify(data, null, 2)}
    </div>
  );
};
 
export default MeetingsView;
