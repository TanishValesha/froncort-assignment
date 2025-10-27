"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RichTextEditor from "@/components/Editor/Main";

export default function Home() {
  const [post, setPost] = useState("");

  const onChange = (content: string) => {
    setPost(content);

    console.log(content);
  };


  return (
    <div className="h-screen bg-slate-100">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <Sidebar
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={80}>
          <div className="h-full bg-white overflow-hidden flex flex-col">
            <RichTextEditor content={post} onChange={onChange} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}