"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Image from "@tiptap/extension-image";
import { Markdown } from "tiptap-markdown";
import { common, createLowlight } from "lowlight";
import MenuBar from "./MenuBar";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({
    content,
    onChange,
}: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
                codeBlock: false,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            TaskList.configure({
                HTMLAttributes: {
                    class: "not-prose pl-2",
                },
            }),
            TaskItem.configure({
                HTMLAttributes: {
                    class: "flex items-start gap-2",
                },
                nested: true,
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: "border-collapse table-auto w-full my-4",
                },
            }),
            TableRow.configure({
                HTMLAttributes: {
                    class: "border border-slate-300",
                },
            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: "border border-slate-300 bg-slate-100 p-2 font-bold text-left",
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: "border border-slate-300 p-2",
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: "bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm my-4",
                },
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    class: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
                },
            }),
            Mention.configure({
                HTMLAttributes: {
                    class: "bg-blue-100 text-blue-800 rounded px-1 py-0.5",
                },
                suggestion: {
                    items: ({ query }) => {
                        return [
                            "Luka",
                            "Kobe",
                            "James",
                            "Victor",
                        ]
                            .filter((item) =>
                                item.toLowerCase().startsWith(query.toLowerCase())
                            )
                            .slice(0, 5);
                    },
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-full h-auto rounded-lg my-4",
                },
            }),
            Markdown.configure({
                html: true,
                transformPastedText: true,
                transformCopiedText: false,
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "editor min-h-full border-0 bg-white py-4 px-6 focus:outline-none w-full",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="flex flex-col h-full">
            <div className="border-b border-slate-200 bg-slate-50">
                <div className="mx-auto">
                    <MenuBar editor={editor} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <EditorContent editor={editor} className="h-full" />
            </div>
        </div>
    );
}