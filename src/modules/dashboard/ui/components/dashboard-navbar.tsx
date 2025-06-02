"use client";

import { useEffect, useState } from "react";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";

import { Button } from "@meet/components/ui/button";
import { useSidebar } from "@meet/components/ui/sidebar";

import DashboardCommand from "./dashboard-command";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandIsOpen, setCommandIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
  
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandIsOpen} setOpen={setCommandIsOpen} />
      <nav className="flex px-4 gap-x-2 cursor-pointer items-center py-3 bg-background border-b">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {
            (isMobile || state === "collapsed") ? <PanelLeftIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4" /> 
          }
        </Button>
        <Button
          size="sm"
          onClick={() => setCommandIsOpen((open) => !open)}
          className="size-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
        >
          <SearchIcon />
          Search

          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ">
            <span className="text-sx">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
 
export default DashboardNavbar;
