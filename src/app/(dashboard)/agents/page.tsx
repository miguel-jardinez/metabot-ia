
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ErrorState from "@meet/components/error-state";
import LoadingState from "@meet/components/loading-state";
import ListAgentHeader from "@meet/modules/agents/ui/components/list-agent-header";
import AgentsView from "@meet/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@meet/trpc/server";

const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <ListAgentHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LoadingState title="Agents loading" description="It will take a few secconds"  />}>
          <ErrorBoundary fallback={<ErrorState title="Error Loading Agents" description="Error fetching agents" />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};
 
export default Page;
