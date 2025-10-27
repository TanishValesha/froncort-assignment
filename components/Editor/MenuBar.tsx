import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    CheckSquare,
    Table as TableIcon,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
    Columns,
    Rows,
    Trash2,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Button } from "../ui/button";
import { Editor } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function MenuBar({ editor }: { editor: Editor | null }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [linkUrl, setLinkUrl] = useState("");
    const [linkText, setLinkText] = useState("");
    const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes("link").href;
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, "");

        setLinkUrl(previousUrl || "");
        setLinkText(selectedText || "");
        setIsLinkPopoverOpen(true);
    }, [editor]);

    const handleSetLink = useCallback(() => {
        if (!editor) return;

        if (linkUrl === "") {
            return;
        }

        if (linkText) {
            editor
                .chain()
                .focus()
                .insertContent({
                    type: "text",
                    text: linkText,
                    marks: [{ type: "link", attrs: { href: linkUrl } }],
                })
                .run();
        } else {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: linkUrl })
                .run();
        }

        setIsLinkPopoverOpen(false);
        setLinkUrl("");
        setLinkText("");
    }, [editor, linkUrl, linkText]);

    const handleCancelLink = useCallback(() => {
        setIsLinkPopoverOpen(false);
        setLinkUrl("");
        setLinkText("");
    }, []);

    const addImage = useCallback(() => {
        if (!editor) return;
        fileInputRef.current?.click();
    }, [editor]);

    const handleImageUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!editor) return;

            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const src = e.target?.result as string;
                    editor.chain().focus().setImage({ src }).run();
                };
                reader.readAsDataURL(file);
            }
        },
        [editor]
    );

    const insertTable = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () => {
                if (editor.isActive("heading", { level: 1 })) {
                    editor.chain().focus().setParagraph().run();
                } else {
                    editor.chain().focus().setHeading({ level: 1 }).run();
                }
            },
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () => {
                if (editor.isActive("heading", { level: 2 })) {
                    editor.chain().focus().setParagraph().run();
                } else {
                    editor.chain().focus().setHeading({ level: 2 }).run();
                }
            },
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () => {
                if (editor.isActive("heading", { level: 3 })) {
                    editor.chain().focus().setParagraph().run();
                } else {
                    editor.chain().focus().setHeading({ level: 3 }).run();
                }
            },
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <CheckSquare className="size-4" />,
            onClick: () => editor.chain().focus().toggleTaskList().run(),
            pressed: editor.isActive("taskList"),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
        },
        {
            icon: <Code className="size-4" />,
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            pressed: editor.isActive("codeBlock"),
        },
        {
            icon: <ImageIcon className="size-4" />,
            onClick: addImage,
            pressed: false,
        },
    ];

    return (
        <div className="p-2 space-x-2 flex flex-wrap justify-start items-center gap-1">
            {Options.map((option, index) => (
                <Toggle
                    key={index}
                    pressed={option.pressed}
                    onPressedChange={option.onClick}
                >
                    {option.icon}
                </Toggle>
            ))}

            {/* Link Popover */}
            <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={setLink}
                        className={`h-9 w-9 p-0 ${editor.isActive("link") ? "bg-slate-200" : ""
                            }`}
                    >
                        <LinkIcon className="size-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm">Insert Link</h4>
                        <div className="space-y-2">
                            <Input
                                placeholder="Display text"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSetLink();
                                    }
                                }}
                            />
                            <Input
                                placeholder="URL (https://...)"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSetLink();
                                    }
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2 justify-end">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCancelLink}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleSetLink}
                                disabled={!linkUrl}
                            >
                                Insert
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Table Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-9 w-9 p-0 ${editor.isActive("table") ? "bg-slate-200" : ""
                            }`}
                    >
                        <TableIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={insertTable}>
                        <TableIcon className="size-4 mr-2" />
                        Insert Table
                    </DropdownMenuItem>
                    {editor.isActive("table") && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    editor.chain().focus().addColumnBefore().run()
                                }
                            >
                                <Columns className="size-4 mr-2" />
                                Add Column Before
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor.chain().focus().addColumnAfter().run()
                                }
                            >
                                <Columns className="size-4 mr-2" />
                                Add Column After
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor.chain().focus().deleteColumn().run()
                                }
                            >
                                <Trash2 className="size-4 mr-2" />
                                Delete Column
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    editor.chain().focus().addRowBefore().run()
                                }
                            >
                                <Rows className="size-4 mr-2" />
                                Add Row Before
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor.chain().focus().addRowAfter().run()
                                }
                            >
                                <Rows className="size-4 mr-2" />
                                Add Row After
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    editor.chain().focus().deleteRow().run()
                                }
                            >
                                <Trash2 className="size-4 mr-2" />
                                Delete Row
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    editor.chain().focus().deleteTable().run()
                                }
                                className="text-red-600"
                            >
                                <Trash2 className="size-4 mr-2" />
                                Delete Table
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />
        </div>
    );
}