import { useQuery } from "@tanstack/react-query";

import { jobImageUrlQuery } from "@/lib/jobs";
import { cn } from "@/lib/utils";

/** Shfaq foton opsionale te ofertes; kthen null nese oferta nuk ka foto. */
export function JobImage({
  path,
  alt,
  className,
}: {
  path: string | null;
  alt: string;
  className?: string;
}) {
  const { data: url } = useQuery({ ...jobImageUrlQuery(path), enabled: Boolean(path) });

  if (!path || !url) return null;

  return <img src={url} alt={alt} loading="lazy" className={cn("object-cover", className)} />;
}
