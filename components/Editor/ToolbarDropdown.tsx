import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

interface ToolbarDropdownProps {
    icon: ReactNode;
    tooltip: string;
    isActive?: boolean;
    children: ReactNode;
}

export default function ToolbarDropdown({ icon, tooltip, isActive, children }: ToolbarDropdownProps) {
    return (
        <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-lg"
                            className={`h-9 w-9 p-0 ${isActive ? "bg-slate-200" : ""}`}
                        >
                            {icon}
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}