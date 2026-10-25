import type { LinkItem } from "@/data/profile";

export default function LinkCard({ title, url }: Pick<LinkItem, "title" | "url">) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl bg-neutral-200 px-5 py-4 text-center font-medium text-neutral-900 transition hover:bg-neutral-300 active:scale-[0.98] dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
    >
      {title}
    </a>
  );
}
