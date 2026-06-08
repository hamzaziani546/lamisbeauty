"use client";

import { useCallback, useEffect, useState } from "react";
import {
  adminFetch,
  type WhatsAppConversation,
  type WhatsAppConversationsResponse,
  type WhatsAppMessage,
  type WhatsAppMessagesResponse,
} from "@/lib/admin-api";

function formatWhen(value?: number | string | null) {
  if (!value) return "—";
  const date =
    typeof value === "number"
      ? new Date(value * 1000)
      : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function WhatsAppPanel() {
  const [conversations, setConversations] = useState<WhatsAppConversation[]>([]);
  const [meta, setMeta] = useState<Record<string, unknown>>({});
  const [configured, setConfigured] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<WhatsAppConversationsResponse>(
        `/admin/whatsapp/conversations?page=${page}&status=all`
      );
      setConversations(res.items);
      setMeta(res.meta || {});
      setConfigured(res.configured !== false);
      if (res.error) {
        setError(
          typeof res.error === "string"
            ? res.error
            : "Could not load Chatwoot conversations"
        );
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const loadMessages = useCallback(async (conversationId: number) => {
    setMessagesLoading(true);
    setError(null);
    try {
      const res = await adminFetch<WhatsAppMessagesResponse>(
        `/admin/whatsapp/conversations/${conversationId}/messages`
      );
      setMessages(res.items);
      if (res.error) {
        setError(
          typeof res.error === "string"
            ? res.error
            : "Could not load conversation messages"
        );
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (selectedId) loadMessages(selectedId);
    else setMessages([]);
  }, [selectedId, loadMessages]);

  const selected = conversations.find((c) => c.id === selectedId) || null;

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-950">WhatsApp inbox</h2>
            <p className="text-xs text-slate-500">
              Conversations from Meta template confirmations.
            </p>
          </div>
          <button
            onClick={loadConversations}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {!configured && (
          <div className="m-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Chatwoot is not configured on the API yet.
          </div>
        )}

        <div className="max-h-[70vh] overflow-y-auto">
          {loading && conversations.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-400">Loading...</p>
          ) : conversations.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-400">
              No conversations yet.
            </p>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedId(conversation.id)}
                className={`w-full border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 ${
                  selectedId === conversation.id ? "bg-emerald-50/60" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900" dir="auto">
                      {conversation.contact_name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {conversation.contact_phone || "—"}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[11px] text-slate-400">
                      {formatWhen(conversation.last_message_at)}
                    </p>
                    {conversation.unread_count > 0 && (
                      <span className="mt-1 inline-block rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                        {conversation.unread_count}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600" dir="auto">
                  {conversation.last_message || "—"}
                </p>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-slate-500">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={Boolean(meta.all_count && conversations.length === 0)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm xl:col-span-3">
        <div className="border-b border-slate-100 px-5 py-4">
          {selected ? (
            <>
              <h2 className="font-semibold text-slate-950" dir="auto">
                {selected.contact_name}
              </h2>
              <p className="text-sm text-slate-500">{selected.contact_phone}</p>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-slate-950">Conversation</h2>
              <p className="text-sm text-slate-500">
                Select a contact to read messages.
              </p>
            </>
          )}
        </div>

        <div className="flex max-h-[70vh] min-h-[420px] flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {!selectedId ? (
              <p className="text-center text-sm text-slate-400">
                Pick a conversation from the list.
              </p>
            ) : messagesLoading ? (
              <p className="text-center text-sm text-slate-400">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-sm text-slate-400">No messages yet.</p>
            ) : (
              messages.map((message) => {
                const outgoing =
                  message.message_type === 1 || message.sender_type === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex ${outgoing ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                        outgoing
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                      dir="auto"
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={`mt-2 text-[10px] ${
                          outgoing ? "text-emerald-100" : "text-slate-400"
                        }`}
                      >
                        {formatWhen(message.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="xl:col-span-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </section>
  );
}
