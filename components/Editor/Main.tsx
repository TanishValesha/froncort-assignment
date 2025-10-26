"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";

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
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "min-h-full border-0 bg-white py-4 px-6 focus:outline-none prose prose-sm  mx-auto w-full",
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