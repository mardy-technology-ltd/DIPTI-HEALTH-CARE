alter table public.story
add column if not exists "card_subtitle" text;

update public.story
set "card_subtitle" = coalesce("card_subtitle", 'Treating patients like family.')
where "card_subtitle" is null;

alter table public.story
alter column "card_subtitle" set default 'Treating patients like family.';

alter table public.story
alter column "card_subtitle" set not null;
