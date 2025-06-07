import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@meet/components/ui/breadcrumb";
import { Button } from "@meet/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@meet/components/ui/dropdown-menu";

type AgentIdViewHeaderProps = {
  agentId: string
  name: string
  onEdit: () => void
  onRemove: () => void
};

const AgentIdViewHeader = ({ agentId, name, onEdit, onRemove } : AgentIdViewHeaderProps) => (
  <div className="flex items-center justify-between">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="font-medium text-xl">
            <Link href="/agents">
              My agents 
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="text-foreground text-xl font-medium [&>svg]:size-4" />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
            <Link href={`/agents/${agentId}`}>
              {name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <DropdownMenu modal={false}>
      
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <PencilIcon className="size-4 text-black" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemove}>
          <Trash2Icon className="size-4 text-black" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
 
export default AgentIdViewHeader;
