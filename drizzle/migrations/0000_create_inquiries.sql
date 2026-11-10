CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_name text NOT NULL,
  phone text NOT NULL,
  email text,
  industry text NOT NULL,
  service text NOT NULL,
  package text,
  requirements text NOT NULL,
  preferred_contact text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new',
  source_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policies: inquiries are written only through submit_inquiry
-- and will be readable only by approved owner accounts (added with the owner workspace).

CREATE INDEX inquiries_source_recent_idx ON public.inquiries (source_hash, created_at DESC);
CREATE INDEX inquiries_phone_recent_idx ON public.inquiries (phone, created_at DESC);

CREATE OR REPLACE FUNCTION public.submit_inquiry(
  _full_name text,
  _business_name text,
  _phone text,
  _email text,
  _industry text,
  _service text,
  _package text,
  _requirements text,
  _preferred_contact text,
  _consent boolean,
  _source_hash text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id uuid;
  recent_by_source int;
  recent_by_phone int;
BEGIN
  IF NOT coalesce(_consent, false) THEN
    RAISE EXCEPTION 'consent_required';
  END IF;
  IF length(coalesce(_full_name, '')) NOT BETWEEN 2 AND 100
     OR length(coalesce(_business_name, '')) NOT BETWEEN 2 AND 120
     OR length(coalesce(_phone, '')) NOT BETWEEN 8 AND 20
     OR length(coalesce(_requirements, '')) NOT BETWEEN 10 AND 2000
     OR length(coalesce(_email, '')) > 254
     OR length(coalesce(_industry, '')) NOT BETWEEN 1 AND 60
     OR length(coalesce(_service, '')) NOT BETWEEN 1 AND 60
     OR length(coalesce(_package, '')) > 60
     OR length(coalesce(_preferred_contact, '')) NOT BETWEEN 1 AND 20 THEN
    RAISE EXCEPTION 'invalid_input';
  END IF;

  SELECT count(*) INTO recent_by_source FROM public.inquiries
   WHERE source_hash = _source_hash AND created_at > now() - interval '10 minutes';
  SELECT count(*) INTO recent_by_phone FROM public.inquiries
   WHERE phone = _phone AND created_at > now() - interval '24 hours';
  IF recent_by_source >= 3 OR recent_by_phone >= 5 THEN
    RAISE EXCEPTION 'rate_limited';
  END IF;

  INSERT INTO public.inquiries (full_name, business_name, phone, email, industry, service, package,
    requirements, preferred_contact, consent, source_hash)
  VALUES (_full_name, _business_name, _phone, nullif(_email, ''), _industry, _service, nullif(_package, ''),
    _requirements, _preferred_contact, _consent, _source_hash)
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_inquiry(text,text,text,text,text,text,text,text,text,boolean,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_inquiry(text,text,text,text,text,text,text,text,text,boolean,text) TO anon, authenticated, service_role;