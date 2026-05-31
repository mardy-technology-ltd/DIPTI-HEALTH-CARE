alter table public.story
add column if not exists "card_title" text;

update public.story
set "card_title" = coalesce("card_title", 'Compassionate Care')
where "card_title" is null;

alter table public.story
alter column "card_title" set default 'Compassionate Care';

alter table public.story
alter column "card_title" set not null;
