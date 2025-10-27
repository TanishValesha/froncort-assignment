interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    active?: boolean;
}

export default function NavItem({ icon, label, onClick, active }: NavItemProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center cursor-pointer p-2 rounded transition-colors ${active
                ? "bg-slate-100 text-slate-900"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
        >
            <span className="w-5 h-5 mr-3">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}