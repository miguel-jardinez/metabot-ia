"use client";

import { useCallback, useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { Button } from "@meet/components/ui/button";
import { DEFAULT_PAGE_NUMBER } from "@meet/constants";

import useAgentFilters from "../../hooks/use-agents-filter";
import AgentSearchFilters from "./agents-search-filter";
import NewAgentDialog from "./new-agent-dialog";

const ListAgentHeader = () => {
  const [filters, setFilters] = useAgentFilters();
  const [isOpen, setIsOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = useCallback(() => {
    setFilters({
      page: DEFAULT_PAGE_NUMBER,
      search: ""
    });
  }, [setFilters]);

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
        <div className="flex items-center gap-x-2 p-1">
          <AgentSearchFilters />
          { isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
 
export default ListAgentHeader;
