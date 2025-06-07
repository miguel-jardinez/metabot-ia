import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ErrorState from "@meet/components/error-state";
import LoadingState from "@meet/components/loading-state";
import AgentIdView from "@meet/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@meet/trpc/server";

type PageProps = {
  params: Promise<{ agentId: string }>
};

const Page = async ({ params } : PageProps) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Agent loading" description="It will take a few secconds"  />}>
        <ErrorBoundary fallback={<ErrorState title="Error Loading Agent" description="Error fetching agent" />}>
          <AgentIdView 
            agentId={agentId}
          />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
 
export default Page;
