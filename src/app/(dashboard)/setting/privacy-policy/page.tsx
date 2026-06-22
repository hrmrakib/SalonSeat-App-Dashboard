/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetCMSQuery,
  useUpdateCMSMutation,
} from "@/redux/features/setting/settingAPI";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditTermsTab() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [content, setContent] = useState<string>("");

  const { data: aboutUsData, isLoading } = useGetCMSQuery({});
  const terms = aboutUsData?.data?.privacy_policy;

  console.log(aboutUsData?.data?.privacy_policy);

  const [updateCMSMutation, { isLoading: isSaving }] = useUpdateCMSMutation();

  useEffect(() => {
    let initialized = false;

    const init = async () => {
      if (initialized || quillRef.current) return;
      initialized = true;

      const Quill = (await import("quill")).default;

      if (editorRef.current && !editorRef.current.querySelector(".ql-editor")) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter your privacy policy...",
        });

        quillRef.current = quill;

        if (aboutUsData?.data?.privacy_policy) {
          quill.root.innerHTML = aboutUsData?.data?.privacy_policy;
          setContent(aboutUsData?.data?.privacy_policy);
        }

        quill.on("text-change", () => {
          setContent(quill.root.innerHTML);
        });
      }
    };

    if (typeof window !== "undefined") {
      init();
    }

    return () => {
      initialized = true;
    };
  }, [aboutUsData?.data?.privacy_policy]);

  if (isLoading && !terms && !quillRef.current) return <div>Loading...</div>;

  const handleSubmit = async () => {
    if (!content || content === "<p><br></p>") {
      toast.error("Description cannot be empty");
      return;
    }

    try {
      const res = await updateCMSMutation({
        privacy_policy: content,
      }).unwrap();

      if (res) {
        toast.success("Privacy policy updated successfully!");
        router.push("/setting");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update content.");
    }
  };

  return (
    <div className='min-h-[75vh] w-[96%] mx-auto flex flex-col justify-between gap-6 p-5'>
      <div className='space-y-6'>
        <h2 className='flex items-center gap-2 text-base font-semibold text-slate-800 mb-6 pb-4 border-b border-slate-100'>
          <button onClick={() => router.back()}>
            <ArrowLeft />
          </button>
          Edit Privacy Policy
        </h2>

        <div className='h-auto'>
          <div
            ref={editorRef}
            className='h-[50vh] bg-white text-base text-primary'
            id='quill-editor'
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          onClick={handleSubmit}
          disabled={isSaving}
          className='w-full h-12! py-3 bg-teal-700 text-white text-sm font-bold rounded-lg hover:bg-teal-800 transition-colors'
        >
          {isSaving ? "Saving..." : "Save Content"}
        </Button>
      </div>
    </div>
  );
}
