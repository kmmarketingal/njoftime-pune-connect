CREATE TABLE public.job_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  requirements TEXT NOT NULL DEFAULT '',
  job_type TEXT NOT NULL DEFAULT 'Kohë e plotë',
  city TEXT NOT NULL DEFAULT '',
  salary TEXT,
  company TEXT,
  expires_at DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.job_offers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_offers TO authenticated;
GRANT ALL ON public.job_offers TO service_role;

ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active job offers" ON public.job_offers FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Authenticated can view all job offers" ON public.job_offers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert job offers" ON public.job_offers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update job offers" ON public.job_offers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete job offers" ON public.job_offers FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_job_offers_updated_at BEFORE UPDATE ON public.job_offers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.job_offers (title, description, requirements, job_type, city, salary, company, expires_at, is_active) VALUES
('Kamerier/e në restorant', 'Kërkojmë kamerier/e për një restorant të njohur në qendër të Tiranës. Ambient i qetë, ekip i ri dhe trajnim në vendin e punës. Turne të organizuara, mundësi për rritje në pozicionin e shefit të sallës.', 'Eksperiencë 1 vit (jo e detyrueshme)\nKomunikim i mirë me klientin\nGatishmëri për turne\nSerioziteti dhe pastërtia personale', 'Kohë e plotë', 'Tiranë', '60.000 - 80.000 Lekë', 'Restorant Partner', '2026-12-31', true),
('Punëtor/e në fabrikë prodhimi', 'Fabrikë prodhimi në Durrës kërkon punëtorë për linjën e prodhimit. Ofrohet transport falas, pagesë në kohë dhe kontratë e rregullt e punës.', 'Aftësi për punë në grup\nGatishmëri fizike\nNuk kërkohet eksperiencë paraprake', 'Kohë e plotë', 'Durrës', '55.000 Lekë', 'Fabrikë Prodhimi', '2026-11-30', true),
('Shitës/e në dyqan veshjesh', 'Dyqan veshjesh në Prishtinë kërkon shitës/e me energji pozitive dhe dëshirë për të punuar me klientë. Bonus mbi shitjet.', 'Komunikim i shkëlqyer\nNjohuri bazë të kompjuterit\nParaqitje e mirë', 'Kohë e plotë', 'Prishtinë', '450 - 600 EUR', 'Dyqan Moda', '2026-10-31', true),
('Muratorë dhe hidraulikë për Gjermani', 'Kompani gjermane e ndërtimit kërkon muratorë dhe hidraulikë. Ndihmojmë me dokumentacionin, vizën dhe akomodimin. Kontratë afatgjatë.', 'Eksperiencë minimum 2 vjet në profesion\nPasaportë e vlefshme\nGatishmëri për të punuar jashtë vendit', 'Jashtë vendit', 'Gjermani', '2.200 - 2.800 EUR', 'Partner Ndërtimi GmbH', '2026-12-15', true);