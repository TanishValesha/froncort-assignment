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
    Table,
    Code,
    Link,
    Image,
    Columns,
    Rows,
    Trash2,
    Type,
    AlignJustify,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Button } from "../ui/button";
import { Editor } from "@tiptap/react";
import { useCallback, useRef, useState, ReactNode } from "react";
import {
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import ToolbarDropdown from "./ToolbarDropdown";
import ToolbarDropdownItem from "./ToolbarMenuItem";


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
        editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    const textFormattingOptions = [
        {
            icon: <Bold className="size-5" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
            toolName: "Bold",
        },
        {
            icon: <Italic className="size-5" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
            toolName: "Italic",
        },
        {
            icon: <Strikethrough className="size-5" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
            toolName: "Strikethrough",
        },
        {
            icon: <Highlighter className="size-5" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
            toolName: "Highlight",
        },
    ];

    const listOptions = [
        {
            icon: <List className="size-5" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
            toolName: "Bullet List",
        },
        {
            icon: <ListOrdered className="size-5" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
            toolName: "Ordered List",
        },
        {
            icon: <CheckSquare className="size-5" />,
            onClick: () => editor.chain().focus().toggleTaskList().run(),
            pressed: editor.isActive("taskList"),
            toolName: "Task List",
        },
    ];

    return (
        <div className="p-2 space-x-2 flex flex-wrap justify-start items-center gap-1">
            <ToolbarDropdown
                icon={<Type className="size-5" />}
                tooltip="Headings"
                isActive={editor.isActive("heading")}
            >
                <ToolbarDropdownItem
                    icon={<Heading1 className="size-5" />}
                    label="Heading 1"
                    onClick={() => {
                        if (editor.isActive("heading", { level: 1 })) {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor.chain().focus().setHeading({ level: 1 }).run();
                        }
                    }}
                    isActive={editor.isActive("heading", { level: 1 })}
                />
                <ToolbarDropdownItem
                    icon={<Heading2 className="size-5" />}
                    label="Heading 2"
                    onClick={() => {
                        if (editor.isActive("heading", { level: 2 })) {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor.chain().focus().setHeading({ level: 2 }).run();
                        }
                    }}
                    isActive={editor.isActive("heading", { level: 2 })}
                />
                <ToolbarDropdownItem
                    icon={<Heading3 className="size-5" />}
                    label="Heading 3"
                    onClick={() => {
                        if (editor.isActive("heading", { level: 3 })) {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor.chain().focus().setHeading({ level: 3 }).run();
                        }
                    }}
                    isActive={editor.isActive("heading", { level: 3 })}
                />
            </ToolbarDropdown>

            {/* Text Formatting */}
            {textFormattingOptions.map((option, index) => (
                <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <Toggle
                            pressed={option.pressed}
                            onPressedChange={option.onClick}
                            className={option.pressed ? "bg-slate-200" : ""}
                        >
                            {option.icon}
                        </Toggle>

                    </TooltipTrigger>
                    <TooltipContent>{option.toolName}</TooltipContent>
                </Tooltip>
            ))}

            {/* Text Alignment Dropdown */}
            <ToolbarDropdown
                icon={<AlignJustify className="size-5" />}
                tooltip="Text Alignment"
            >
                <ToolbarDropdownItem
                    icon={<AlignLeft className="size-5" />}
                    label="Align Left"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    isActive={editor.isActive({ textAlign: "left" })}
                />
                <ToolbarDropdownItem
                    icon={<AlignCenter className="size-5" />}
                    label="Align Center"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    isActive={editor.isActive({ textAlign: "center" })}
                />
                <ToolbarDropdownItem
                    icon={<AlignRight className="size-5" />}
                    label="Align Right"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    isActive={editor.isActive({ textAlign: "right" })}
                />
            </ToolbarDropdown>

            {/* Lists */}
            {listOptions.map((option, index) => (
                <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <Toggle
                            pressed={option.pressed}
                            onPressedChange={option.onClick}
                        >
                            {option.icon}
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>{option.toolName}</TooltipContent>
                </Tooltip>
            ))}

            {/* Code Block */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle
                        pressed={editor.isActive("codeBlock")}
                        onPressedChange={() =>
                            editor.chain().focus().toggleCodeBlock().run()
                        }
                    >
                        <Code className="size-5" />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>Code Block</TooltipContent>
            </Tooltip>

            <Popover
                open={isLinkPopoverOpen}
                onOpenChange={setIsLinkPopoverOpen}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={setLink}
                                className={`h-9 w-9 p-0 ${editor.isActive("link") ? "bg-slate-200" : ""
                                    }`}
                            >
                                <Link className="size-5" />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Insert Link</TooltipContent>
                </Tooltip>
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

            {/* Image Upload */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={addImage}
                        className="h-9 w-9 p-0"
                    >
                        <Image className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Image</TooltipContent>
            </Tooltip>

            {/* Table Dropdown */}
            <ToolbarDropdown
                icon={<Table className="size-5" />}
                tooltip="Table Options"
                isActive={editor.isActive("table")}
            >
                <ToolbarDropdownItem
                    icon={<Table className="size-5" />}
                    label="Insert Table"
                    onClick={insertTable}
                />
                {editor.isActive("table") && (
                    <>
                        <DropdownMenuSeparator />
                        <ToolbarDropdownItem
                            icon={<Columns className="size-5" />}
                            label="Add Column Before"
                            onClick={() => editor.chain().focus().addColumnBefore().run()}
                        />
                        <ToolbarDropdownItem
                            icon={<Columns className="size-5" />}
                            label="Add Column After"
                            onClick={() => editor.chain().focus().addColumnAfter().run()}
                        />
                        <ToolbarDropdownItem
                            icon={<Trash2 className="size-5" />}
                            label="Delete Column"
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                        />
                        <DropdownMenuSeparator />
                        <ToolbarDropdownItem
                            icon={<Rows className="size-5" />}
                            label="Add Row Before"
                            onClick={() => editor.chain().focus().addRowBefore().run()}
                        />
                        <ToolbarDropdownItem
                            icon={<Rows className="size-5" />}
                            label="Add Row After"
                            onClick={() => editor.chain().focus().addRowAfter().run()}
                        />
                        <ToolbarDropdownItem
                            icon={<Trash2 className="size-5" />}
                            label="Delete Row"
                            onClick={() => editor.chain().focus().deleteRow().run()}
                        />
                        <DropdownMenuSeparator />
                        <ToolbarDropdownItem
                            icon={<Trash2 className="size-5" />}
                            label="Delete Table"
                            onClick={() => editor.chain().focus().deleteTable().run()}
                            variant="danger"
                        />
                    </>
                )}
            </ToolbarDropdown>

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