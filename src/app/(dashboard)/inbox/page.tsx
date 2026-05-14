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
    <div className="bg-white rounded-xl border border-border-light overflow-hidden fade-in">
      <div className="flex h-[calc(100vh-220px)] min-h-[400px]">
        {/* Conversation List */}
        <div
          className={`w-full md:w-80 border-r border-border-light flex flex-col shrink-0 ${
            !showConversationList ? "hidden md:flex" : "flex"
          }`}
        >
          {/* List Header */}
          <div className="px-5 py-4 border-b border-border-light">
            <h2 className="text-lg font-semibold text-text-primary">Messages</h2>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => handleSelectConversation(msg)}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left border-b border-border-light hover:bg-surface-secondary transition-colors cursor-pointer ${
                  selectedConversation?.id === msg.id ? "bg-brand-50" : ""
                }`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-brand">
                    {msg.senderName.charAt(0)}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {msg.senderName}
                    </p>
                    <span className="text-xs text-text-muted shrink-0">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted truncate mt-0.5">
                    {msg.lastMessage}
                  </p>
                </div>

                {/* Unread badge */}
                {msg.unread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col ${
            showConversationList ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border-light">
                {/* Back button (mobile) */}
                <button
                  onClick={() => setShowConversationList(true)}
                  className="md:hidden p-1.5 rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer"
                  aria-label="Back to messages"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>

                <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center">
                  <span className="text-sm font-semibold text-brand">
                    {selectedConversation.senderName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {selectedConversation.senderName}
                  </p>
                  <p className="text-xs text-text-muted">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {chatMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex ${chat.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                        chat.isOwn
                          ? "bg-brand text-white rounded-br-md"
                          : "bg-surface-secondary text-text-primary rounded-bl-md"
                      }`}
                    >
                      <p>{chat.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          chat.isOwn ? "text-white/60" : "text-text-muted"
                        }`}
                      >
                        {chat.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-border-light">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 h-10 px-4 rounded-full border border-border bg-surface-secondary text-sm outline-none focus:border-brand transition-colors placeholder:text-text-muted"
                  />
                  <button
                    onClick={handleSend}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-brand hover:bg-brand-dark text-white transition-colors shrink-0 cursor-pointer"
                    aria-label="Send message"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 mx-auto text-text-muted mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-text-muted text-sm">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
