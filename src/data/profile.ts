export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  avatar: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "Alan",
  bio: "I'm Tech Writer",
  avatar: "/avatar.svg",
  links: [
    { id: "blog", title: "블로그", url: "https://example.com/blog" },
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "x", title: "X (Twitter)", url: "https://x.com" },
    { id: "youtube", title: "YouTube", url: "https://youtube.com" },
  ],
};
