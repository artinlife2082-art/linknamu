import type { LinkItem } from "@/data/profile";

type Props = Pick<LinkItem, "title" | "url"> & {
  count: number;
  onClick: () => void;
};

export default function LinkCard({ title, url, count, onClick }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      onAuxClick={(e) => {
        // 가운데 버튼(휠 클릭)으로 새 탭에 여는 경우도 클릭으로 센다.
        if (e.button === 1) onClick();
      }}
      className="relative block w-full rounded-2xl bg-neutral-200 px-14 py-4 text-center font-medium text-neutral-900 transition hover:bg-neutral-300 active:scale-[0.98] dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600"
    >
      {title}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-neutral-500 dark:text-neutral-400">
        {count}회
      </span>
    </a>
  );
}
