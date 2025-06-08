import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

import ErrorState from "@meet/components/error-state";
import LoadingState from "@meet/components/loading-state";
import { loadSearchParams } from "@meet/modules/agents/params";
import MeetingsView from "@meet/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@meet/trpc/server";

interface PageProps {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams } : PageProps) => {
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Meetings loading" description="It will take a few secconds"  />}>
        <ErrorBoundary fallback={<ErrorState title="Error Loading Meetings" description="Error fetching Meetings" />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
 
export default Page;
