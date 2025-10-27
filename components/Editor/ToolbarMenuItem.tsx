import { ReactNode } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface ToolbarDropdownItemProps {
    icon: ReactNode;
    label: string;
    onClick: () => void;
    isActive?: boolean;
    variant?: "default" | "danger";
}

export default function ToolbarDropdownItem({
    icon,
    label,
    onClick,
    isActive,
    variant = "default"
}: ToolbarDropdownItemProps) {
    return (
        <DropdownMenuItem
            onClick={onClick}
            className={`${isActive ? "bg-slate-100" : ""} ${variant === "danger" ? "text-red-600" : ""
                }`}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </DropdownMenuItem>
    );
}