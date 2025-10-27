"use client";
import { getCurrentUser } from "@/lib/auth";
import { useProjectStore } from "@/store/projectStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectItem from "./ProjectItem";
import UserInfo from "./UserInfo";

export default function Sidebar() {
    const {
        projects,
        currentProjectId,
        setCurrentProject,
        createProject,
    } = useProjectStore();
    const user = typeof window !== "undefined" ? getCurrentUser() : null;
    const router = useRouter();

    const handleSelect = (id: string) => {
        setCurrentProject(id);
        router.push(`/projects/${id}`);
    };

    const handleNew = () => {
        const name = window.prompt("Enter project name");
        if (!name) return;
        const p = createProject(name, "Created via sidebar");
        router.push(`/projects/${p.id}`);
    };

    return (
        <div className="h-full bg-white border-r border-slate-200 p-6 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Editor</h1>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto">
                <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Projects
                        </h2>
                        <button
                            onClick={handleNew}
                            className="p-1 hover:bg-slate-100 rounded transition-colors"
                            title="New Project"
                        >
                            <Plus className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                    <div className="space-y-1">
                        {projects.map((project) => (
                            <ProjectItem
                                key={project.id}
                                id={project.id}
                                name={project.name}
                                active={project.id === currentProjectId}
                                onClick={handleSelect}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <UserInfo user={user} />
        </div>
    );
}