import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export type JobOffer = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  job_type: string;
  city: string;
  salary: string | null;
  company: string | null;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const JOB_TYPES = [
  "Kohe e plote",
  "Kohe e pjesshme",
  "Sezonale",
  "Praktike",
  "Jashte vendit",
] as const;

export const ALBANIA_CITIES = [
  "Tirane",
  "Durres",
  "Vlore",
  "Elbasan",
  "Shkoder",
  "Fier",
  "Korçe",
  "Berat",
  "Lushnje",
  "Kavaje",
  "Pogradec",
  "Lezhe",
  "Sarande",
  "Gjirokaster",
  "Laç",
  "Kukes",
  "Patos",
  "Kruje",
  "Peshkopi",
  "Burrel",
  "Çorovode",
  "Librazhd",
  "Bulqize",
  "Gramsh",
  "Ballsh",
  "Divjake",
  "Fushe-Kruje",
  "Kamez",
  "Mamurras",
  "Permet",
  "Rreshen",
  "Tepelene",
  "Bilisht",
  "Delvine",
  "Erseke",
  "Himare",
  "Kelcyre",
  "Konispol",
  "Koplik",
  "Krume",
  "Maliq",
  "Memaliaj",
  "Orikum",
  "Peqin",
  "Poliçan",
  "Puke",
  "Roskovec",
  "Rrogozhine",
  "Selenice",
  "Shijak",
  "Ura Vajgurore",
  "Vau i Dejes",
  "Vore",
] as const;

export const KOSOVO_CITIES = [
  "Prishtine",
  "Prizren",
  "Ferizaj",
  "Peje",
  "Gjakove",
  "Gjilan",
  "Mitrovice",
  "Podujeve",
  "Vushtrri",
  "Suhareke",
  "Rahovec",
  "Drenas",
  "Lipjan",
  "Malisheve",
  "Kaçanik",
  "Skenderaj",
  "Viti",
  "Deçan",
  "Istog",
  "Kline",
  "Shtime",
  "Dragash",
  "Fushe Kosove",
  "Kamenice",
  "Obiliq",
  "Graçanice",
  "Junik",
  "Hani i Elezit",
  "Mamushe",
  "Novoberde",
  "Partesh",
  "Ranillug",
  "Kllokot",
  "Shterpce",
  "Zubin Potok",
  "Zveçan",
  "Leposaviq",
] as const;

export const WHATSAPP_NUMBER = "355689504445";


export const activeJobsQuery = queryOptions({
  queryKey: ["job_offers", "active"],
  queryFn: async (): Promise<JobOffer[]> => {
    const { data, error } = await supabase
      .from("job_offers")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as JobOffer[];
  },
});

export const jobByIdQuery = (id: string) =>
  queryOptions({
    queryKey: ["job_offers", "one", id],
    queryFn: async (): Promise<JobOffer | null> => {
      const { data, error } = await supabase.from("job_offers").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return (data as JobOffer | null) ?? null;
    },
  });

export const allJobsQuery = queryOptions({
  queryKey: ["job_offers", "all"],
  queryFn: async (): Promise<JobOffer[]> => {
    const { data, error } = await supabase
      .from("job_offers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as JobOffer[];
  },
});

export function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("sq-AL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Nderton linkun wa.me me mesazh te para-plotesuar dhe te koduar sakte. */
export function buildWhatsAppLink(input: {
  jobTitle: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  message: string;
}) {
  const lines = [
    `Aplikim i ri per ${input.jobTitle}`,
    `Emri: ${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
    `Tel: ${input.phone.trim()}`,
    `Qyteti: ${input.city.trim()}`,
    `Mesazh: ${input.message.trim() || "-"}`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
