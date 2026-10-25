import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-8 px-5 py-12">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
      />
      <LinkList links={profile.links} />
    </main>
  );
}
