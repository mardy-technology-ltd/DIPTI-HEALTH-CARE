import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

type Section = 'hero' | 'experiences' | 'story' | 'contact' | 'posts';

type UpdateBody = {
  section?: Section;
  value?: unknown;
};

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);

async function createSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      { auth: { persistSession: false } }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (!accessToken) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: { persistSession: false },
    }
  );
}

async function assertAuthed() {
  const supabase = await createSupabaseClient();

  if (!supabase) {
    return { supabase: null, authed: false };
  }

  return { supabase, authed: true };
}

async function replaceRows(table: string, rows: Record<string, unknown>[]) {
  const { supabase } = await assertAuthed();
  if (!supabase) {
    return { error: new Error('Unauthorized') };
  }

  const deleteResult = await supabase.from(table).delete().neq('id', 0);
  if (deleteResult.error) {
    return deleteResult;
  }

  if (rows.length === 0) {
    return { error: null };
  }

  return supabase.from(table).insert(rows);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as UpdateBody;
    const section = body.section;

    if (!section) {
      return NextResponse.json({ error: 'Missing section' }, { status: 400 });
    }

    const { supabase, authed } = await assertAuthed();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const value = body.value;

    if (section === 'hero' || section === 'story' || section === 'contact') {
      const rowValue = value as Record<string, unknown>;
      const row =
        section === 'hero'
          ? {
              id: 1,
              name: rowValue.name,
              subtitle: rowValue.subtitle,
              tagline: rowValue.tagline,
              description: rowValue.description,
              badge: rowValue.badge,
            }
          : { id: 1, ...rowValue };
      const { error } = await replaceRows(section, [row]);

      if (error) {
        return NextResponse.json(
          { error: error.message, details: error.details ?? null, hint: error.hint ?? null, code: error.code ?? null },
          { status: 400 }
        );
      }

      return NextResponse.json({ ok: true });
    }

    if (section === 'experiences') {
      const rows = Array.isArray(value) ? value : [];
      const { error } = await replaceRows('experiences', rows as Record<string, unknown>[]);

      if (error) {
        return NextResponse.json(
          { error: error.message, details: error.details ?? null, hint: error.hint ?? null, code: error.code ?? null },
          { status: 400 }
        );
      }

      return NextResponse.json({ ok: true });
    }

    if (section === 'posts') {
      const rows = (Array.isArray(value) ? value : []).map((post: any) => {
        const nextPost: Record<string, unknown> = { ...post };
        if (!nextPost.slug && typeof nextPost.title === 'string') {
          nextPost.slug = generateSlug(nextPost.title as string);
        }
        // Remove fields that might not exist in the DB schema (e.g. images array, readTime)
        if ('images' in nextPost) delete nextPost.images;
        if ('readTime' in nextPost) delete nextPost.readTime;
        if ('read_time' in nextPost) delete nextPost.read_time;
        return nextPost;
      });

      const { error } = await replaceRows('blog_posts', rows as Record<string, unknown>[]);

      if (error) {
        return NextResponse.json(
          { error: error.message, details: error.details ?? null, hint: error.hint ?? null, code: error.code ?? null },
          { status: 400 }
        );
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unknown section' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? 'Server error' }, { status: 500 });
  }
}