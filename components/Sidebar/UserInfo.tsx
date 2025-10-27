import { User } from "lucide-react";

interface UserInfoProps {
    user: { name: string; email: string } | null;
}

export default function UserInfo({ user }: UserInfoProps) {
    if (!user) return null;

    return (
        <div className="border-t border-slate-200 pt-4 mt-4">
            <div className="flex items-center p-2 rounded hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                        {user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
            </div>
        </div>
    );
}