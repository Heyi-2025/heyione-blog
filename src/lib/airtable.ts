export interface DailyTask {
  id: string;
  /**
   * Airtable 字段：Date（日期）
   */
  date: string | null;
  /**
   * Airtable 字段：Ctegory（注意拼写）
   * 示例：健身 / 学习
   */
  category: string | null;
  /**
   * Airtable 字段：Task（文本，具体内容）
   */
  task: string;
  /**
   * Airtable 字段：Status（复选框：是否完成）
   */
  completed: boolean;
  /**
   * Airtable 字段：Media（附件：图片/打卡照）
   */
  media: {
    url: string;
    filename?: string;
  }[];
}

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;
const API_TOKEN = process.env.AIRTABLE_PAT;

/**
 * 从 Airtable 读取 DailyTasks 表的数据。
 * 可选按 category（例如「健身」「学习」）在本地过滤。
 */
export async function fetchDailyTasks(
  category?: string
): Promise<DailyTask[]> {
  if (!BASE_ID) {
    throw new Error("Missing environment variable AIRTABLE_BASE_ID");
  }
  if (!TABLE_NAME) {
    throw new Error("Missing environment variable AIRTABLE_TABLE_NAME");
  }
  if (!API_TOKEN) {
    throw new Error("Missing environment variable AIRTABLE_PAT");
  }

  const url = new URL(
    `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`
  );

  // 按日期倒序（最近的在前）
  url.searchParams.set("sort[0][field]", "Date");
  url.searchParams.set("sort[0][direction]", "desc");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    // 任务是实时变动的，这里禁用缓存
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch Airtable daily tasks", await res.text());
    throw new Error("获取任务数据失败，请稍后再试");
  }

  const json = (await res.json()) as {
    records: {
      id: string;
      fields: Record<string, unknown>;
    }[];
  };

  let tasks: DailyTask[] = json.records.map((record) => {
    const fields = record.fields as Record<string, unknown>;

    const rawMedia = fields["Media"];
    const media: DailyTask["media"] = Array.isArray(rawMedia)
      ? rawMedia
          .map((item) => {
            if (
              item &&
              typeof item === "object" &&
              "url" in item &&
              typeof (item as any).url === "string"
            ) {
              return {
                url: (item as any).url as string,
                filename:
                  typeof (item as any).filename === "string"
                    ? ((item as any).filename as string)
                    : undefined,
              };
            }
            return null;
          })
          .filter((v): v is { url: string; filename?: string } => v !== null)
      : [];

    return {
      id: record.id,
      date: (fields["Date"] as string | undefined) ?? null,
      // 注意：字段名是 Ctegory（少了一个 a），需要与 Airtable 一致
      category: (fields["Ctegory"] as string | undefined) ?? null,
      task: String(fields["Task"] ?? ""),
      completed: Boolean(fields["Status"]),
      media,
    };
  });

  if (category) {
    tasks = tasks.filter((t) => t.category === category);
  }

  return tasks;
}


