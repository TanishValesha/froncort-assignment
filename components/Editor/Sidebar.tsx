"use client";
import { FileText, Clock, Save } from "lucide-react";

interface SidebarProps {
    onSave?: () => void;
}

export default function Sidebar({ onSave }: SidebarProps) {
    return (
        <div className="h-full bg-white border-r border-slate-200 p-6 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Editor</h1>
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto">
                <div className="space-y-2">
                    <div className="flex items-center text-slate-700 hover:text-slate-900 cursor-pointer p-2 rounded hover:bg-slate-50 transition-colors">
                        <FileText className="w-5 h-5 mr-3" />
                        <span className="text-sm font-medium">Documents</span>
                    </div>
                    <div className="flex items-center text-slate-700 hover:text-slate-900 cursor-pointer p-2 rounded hover:bg-slate-50 transition-colors">
                        <Clock className="w-5 h-5 mr-3" />
                        <span className="text-sm font-medium">Recent</span>
                    </div>
                    <div className="flex items-center text-slate-700 hover:text-slate-900 cursor-pointer p-2 rounded hover:bg-slate-50 transition-colors">
                        <Save className="w-5 h-5 mr-3" />
                        <span className="text-sm font-medium">Saved</span>
                    </div>
                </div>
            </div>
        </div>
    );
}