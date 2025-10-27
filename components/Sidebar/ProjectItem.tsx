import { NotebookText } from "lucide-react";

interface ProjectItemProps {
    id: string;
    name: string;
    active: boolean;
    onClick: (id: string) => void;
}

export default function ProjectItem({ id, name, active, onClick }: ProjectItemProps) {
    return (
        <div
            onClick={() => onClick(id)}
            className={`flex justify-baseline gap-2 items-center px-3 py-2 rounded cursor-pointer text-sm transition-colors ${active
                ? "bg-slate-100 text-slate-900 font-medium"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
        >
            <NotebookText className="w-5 h-5 text-blue-500" />
            {name}
        </div>
    );
}