alter table public.hero enable row level security;
alter table public.story enable row level security;
alter table public.contact enable row level security;
alter table public.experiences enable row level security;
alter table public.blog_posts enable row level security;

drop policy if exists "authenticated manage hero" on public.hero;
create policy "authenticated insert hero"
on public.hero
for insert
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated update hero" on public.hero;
create policy "authenticated update hero"
on public.hero
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated delete hero" on public.hero;
create policy "authenticated delete hero"
on public.hero
for delete
using (auth.role() = 'authenticated');

drop policy if exists "authenticated manage story" on public.story;
create policy "authenticated insert story"
on public.story
for insert
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated update story" on public.story;
create policy "authenticated update story"
on public.story
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated delete story" on public.story;
create policy "authenticated delete story"
on public.story
for delete
using (auth.role() = 'authenticated');

drop policy if exists "authenticated manage contact" on public.contact;
create policy "authenticated insert contact"
on public.contact
for insert
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated update contact" on public.contact;
create policy "authenticated update contact"
on public.contact
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated delete contact" on public.contact;
create policy "authenticated delete contact"
on public.contact
for delete
using (auth.role() = 'authenticated');

drop policy if exists "authenticated manage experiences" on public.experiences;
create policy "authenticated insert experiences"
on public.experiences
for insert
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated update experiences" on public.experiences;
create policy "authenticated update experiences"
on public.experiences
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated delete experiences" on public.experiences;
create policy "authenticated delete experiences"
on public.experiences
for delete
using (auth.role() = 'authenticated');

drop policy if exists "authenticated manage blog posts" on public.blog_posts;
create policy "authenticated insert blog posts"
on public.blog_posts
for insert
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated update blog posts" on public.blog_posts;
create policy "authenticated update blog posts"
on public.blog_posts
for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "authenticated delete blog posts" on public.blog_posts;
create policy "authenticated delete blog posts"
on public.blog_posts
for delete
using (auth.role() = 'authenticated');
