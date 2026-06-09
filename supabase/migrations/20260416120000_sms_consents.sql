-- SMS consent audit log for A2P 10DLC / TCPA compliance.
-- Every row is the durable proof we captured lawful consent to text a person:
-- who consented, what language they saw, when, from where, and the policy
-- version in effect at that moment. Required for carrier audits and defense
-- against TCPA claims.

create table if not exists public.sms_consents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Contact info as submitted
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,

  -- The two separate consents (A2P 10DLC requires these be independent)
  sms_consent boolean not null,
  terms_consent boolean not null,

  -- Exact checkbox text shown to the user at opt-in time. Frozen per-row so
  -- that future wording changes don't invalidate past consent records.
  checkbox_sms_text text not null,
  checkbox_terms_text text not null,

  -- Policy version strings in effect when the user consented
  privacy_policy_version text not null,
  terms_version text not null,

  -- Request metadata for audit
  ip_address inet,
  user_agent text,
  page_url text,

  -- Aloware forwarding outcome
  aloware_forwarded boolean not null default false,
  aloware_response jsonb,
  aloware_error text
);

create index if not exists sms_consents_created_at_idx
  on public.sms_consents (created_at desc);

create index if not exists sms_consents_phone_idx
  on public.sms_consents (phone)
  where phone is not null;

create index if not exists sms_consents_email_idx
  on public.sms_consents (email);

alter table public.sms_consents enable row level security;

-- Explicit table-level grants. Supabase usually grants these by default on
-- the public schema, but we assert them here so the migration is
-- self-sufficient across projects.
grant insert on table public.sms_consents to anon, authenticated;

-- Anon + authenticated clients may insert new consent records via the
-- opt-in form. They cannot read, update, or delete — audit integrity.
-- Service role bypasses RLS for admin access.
drop policy if exists "anon_insert_sms_consents" on public.sms_consents;
drop policy if exists "public_insert_sms_consents" on public.sms_consents;
drop policy if exists "allow_public_insert" on public.sms_consents;
create policy "allow_public_insert"
  on public.sms_consents
  for insert
  to anon, authenticated
  with check (true);
