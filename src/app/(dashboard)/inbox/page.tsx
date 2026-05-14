"use client";

import React, { useState } from "react";
import { messages, chatMessages } from "@/lib/data";
import type { Message } from "@/lib/types";

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(messages[0] || null);
  const [newMessage, setNewMessage] = useState("");
  const [showConversationList, setShowConversationList] = useState(true);

  const handleSend = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  const handleSelectConversation = (msg: Message) => {
    setSelectedConversation(msg);
    setShowConversationList(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex h-[calc(100vh-220px)] min-h-[400px]">
        {/* Conversation List */}
        <div
          className={`w-full md:w-80 border-r border-gray-100 flex flex-col shrink-0 ${
            !showConversationList ? "hidden md:flex" : "flex"
          }`}
        >
          {/* List Header */}
          <div className="px-5 py-4 border-b border-gray-100">
            {/* Search Input for Inbox matches design */}
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#2BBFBF]"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleSelectConversation(msg)}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedConversation?.id === msg.id ? "bg-[#F0FDFD]" : ""
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                   <img src="/images/salon-listing.png" alt={msg.senderName} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {msg.senderName}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5 leading-relaxed">
                    {msg.lastMessage}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     {msg.timestamp}
                  </div>
                </div>

                {/* Unread badge logic omitted to match design exact or kept simple */}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col bg-[#F8F9FA] ${
            showConversationList ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-[#F8F9FA]">
                <div className="flex items-center gap-3">
                  {/* Back button (mobile) */}
                  <button
                    onClick={() => setShowConversationList(true)}
                    className="md:hidden p-1.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                    aria-label="Back to messages"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>

                  <div className="w-9 h-9 rounded-md overflow-hidden shrink-0">
                     <img src="/images/salon-listing.png" alt={selectedConversation.senderName} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedConversation.senderName}
                  </p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {chatMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex flex-col ${chat.isOwn ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-5 py-3 rounded-[20px] text-sm whitespace-pre-line ${
                        chat.isOwn
                          ? "bg-[#2BBFBF] text-white rounded-tr-none"
                          : "bg-white text-gray-600 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {chat.content}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">{chat.timestamp}</span>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-5 py-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                     <input
                       type="text"
                       value={newMessage}
                       onChange={(e) => setNewMessage(e.target.value)}
                       onKeyDown={(e) => e.key === "Enter" && handleSend()}
                       placeholder="Type your message here ..."
                       className="w-full h-12 pl-4 pr-12 rounded-lg bg-[#F8F9FA] text-sm outline-none focus:ring-1 focus:ring-[#2BBFBF] transition-colors placeholder:text-gray-400"
                     />
                     <button
                       onClick={handleSend}
                       className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#4A6BFF] hover:bg-blue-600 text-white transition-colors shrink-0 cursor-pointer"
                       aria-label="Send message"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                       </svg>
                     </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-sm">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
