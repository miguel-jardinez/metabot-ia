import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ErrorState from "@meet/components/error-state";
import LoadingState from "@meet/components/loading-state";
import MeetingsIdView from "@meet/modules/meetings/ui/views/meetings-id-view";
import { getQueryClient, trpc } from "@meet/trpc/server";

type PageProps = {
  params: Promise<{ meetingId: string }>
};

const Page = async ({ params } : PageProps) => {
  const { meetingId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Meetings loading" description="It will take a few secconds"  />}>
        <ErrorBoundary fallback={<ErrorState title="Error Loading Meetings" description="Error fetching Meetings" />}>
          <MeetingsIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
