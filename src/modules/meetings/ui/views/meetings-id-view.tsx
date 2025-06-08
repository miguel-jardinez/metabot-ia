"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@meet/trpc/client";

type MeetingsIdViewProps = {
  meetingId: string;
};

const MeetingsIdView = ({ meetingId } : MeetingsIdViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

  return (
    <div>
      Meetings Id View {JSON.stringify(data, null, 2)}
    </div>
  );
};
 
export default MeetingsIdView;
