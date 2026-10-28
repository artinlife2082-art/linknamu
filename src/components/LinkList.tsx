"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 비어 있고, 카드는 0회로 표시한다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Record<string, number> }) => {
        // 응답을 기다리는 사이에 누른 클릭이 있으면 그만큼 더해 둔다.
        setCounts((prev) =>
          Object.fromEntries(
            Object.entries(data.counts).map(([id, count]) => [id, count + (prev[id] ?? 0)]),
          ),
        );
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // 새 탭이 열려도 요청이 끊기지 않도록 keepalive를 쓴다.
    fetch(`/api/clicks/${id}`, { method: "POST", keepalive: true }).catch(() => {});
  }

  return (
    <ul className="flex w-full flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
