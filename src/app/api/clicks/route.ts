import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 모든 링크의 클릭 수를 한 번에 반환한다. 기록이 없는 링크는 0.
export async function GET() {
  try {
    const collection = await getClicksCollection();
    const docs = await collection.find().toArray();
    const stored = new Map(docs.map((doc) => [doc._id, doc.count]));

    const counts = Object.fromEntries(
      profile.links.map((link) => [link.id, stored.get(link.id) ?? 0]),
    );
    return Response.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return Response.json({ error: "클릭 수를 가져오지 못했습니다." }, { status: 500 });
  }
}
