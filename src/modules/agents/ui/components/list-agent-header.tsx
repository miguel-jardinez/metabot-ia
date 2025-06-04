"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@meet/components/ui/button";

import NewAgentDialog from "./new-agent-dialog";

const ListAgentHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={isOpen} onOpenChange={setIsOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsOpen(true)}>
            <PlusIcon className="size-4" />
            New Agent
          </Button>
        </div>
      </div>
    </>
  );
};
 
export default ListAgentHeader;
