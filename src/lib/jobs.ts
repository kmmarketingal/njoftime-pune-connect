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
  "Kohë e plotë",
  "Kohë e pjesshme",
  "Sezonale",
  "Praktikë",
  "Jashtë vendit",
] as const;

export const ALBANIA_CITIES = [
  "Tiranë",
  "Durrës",
  "Vlorë",
  "Elbasan",
  "Shkodër",
  "Fier",
  "Korçë",
  "Berat",
  "Lushnjë",
  "Kavajë",
  "Pogradec",
  "Lezhë",
  "Sarandë",
  "Gjirokastër",
  "Laç",
  "Kukës",
  "Patos",
  "Krujë",
  "Peshkopi",
  "Burrel",
  "Çorovodë",
  "Librazhd",
  "Bulqizë",
  "Gramsh",
  "Ballsh",
  "Divjakë",
  "Fushë-Krujë",
  "Kamëz",
  "Mamurras",
  "Përmet",
  "Rrëshen",
  "Tepelenë",
  "Bilisht",
  "Delvinë",
  "Ersekë",
  "Himarë",
  "Kelcyrë",
  "Konispol",
  "Koplik",
  "Krumë",
  "Maliq",
  "Memaliaj",
  "Orikum",
  "Peqin",
  "Poliçan",
  "Pukë",
  "Roskovec",
  "Rrogozhinë",
  "Selenicë",
  "Shijak",
  "Ura Vajgurore",
  "Vau i Dejës",
  "Vorë",
] as const;

export const KOSOVO_CITIES = [
  "Prishtinë",
  "Prizren",
  "Ferizaj",
  "Pejë",
  "Gjakovë",
  "Gjilan",
  "Mitrovicë",
  "Podujevë",
  "Vushtrri",
  "Suharekë",
  "Rahovec",
  "Drenas",
  "Lipjan",
  "Malishevë",
  "Kaçanik",
  "Skenderaj",
  "Viti",
  "Deçan",
  "Istog",
  "Klinë",
  "Shtime",
  "Dragash",
  "Fushë Kosovë",
  "Kamenicë",
  "Obiliq",
  "Graçanicë",
  "Junik",
  "Hani i Elezit",
  "Mamushë",
  "Novobërdë",
  "Partesh",
  "Ranillug",
  "Kllokot",
  "Shtërpce",
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

/** Ndërton linkun wa.me me mesazh të para-plotësuar dhe të koduar saktë. */
export function buildWhatsAppLink(input: {
  jobTitle: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  message: string;
}) {
  const lines = [
    `Aplikim i ri për ${input.jobTitle}`,
    `Emri: ${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
    `Tel: ${input.phone.trim()}`,
    `Qyteti: ${input.city.trim()}`,
    `Mesazh: ${input.message.trim() || "-"}`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
