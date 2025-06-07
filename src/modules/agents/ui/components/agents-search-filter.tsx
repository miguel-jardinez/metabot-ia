import { SearchIcon } from "lucide-react";

import { Input } from "@meet/components/ui/input";

import useAgentFilters from "../../hooks/use-agents-filter";

const AgentSearchFilters = () => {
  const [filters, setFilters] = useAgentFilters();
  
  return (
    <div className="relative">
      <Input value={filters.search} placeholder="Filter by name" className="h-9 bg-background w-[200px] pl-7" onChange={(e) => setFilters({ search: e.target.value })} />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};
 
export default AgentSearchFilters;
