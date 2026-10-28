import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// dev 서버의 핫 리로드 때 연결이 계속 늘어나지 않도록 전역에 보관한다.
const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>;
};

export function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
  }
  globalForMongo.mongoClient ??= new MongoClient(uri).connect();
  return globalForMongo.mongoClient;
}

export type ClickDoc = { _id: string; count: number };

export async function getClicksCollection() {
  const client = await getClient();
  return client.db().collection<ClickDoc>("clicks");
}
