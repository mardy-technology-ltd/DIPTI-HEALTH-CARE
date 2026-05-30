'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  defaultHero, defaultExperiences, defaultStory, defaultContact, defaultBlogPosts,
  HeroData, ExperienceItem, StoryData, ContactData, BlogPost,
} from '@/lib/siteData';

type AdminCtx = {
  hero: HeroData; setHero: (v: HeroData) => Promise<void>;
  experiences: ExperienceItem[]; setExperiences: (v: ExperienceItem[]) => Promise<void>;
  story: StoryData; setStory: (v: StoryData) => Promise<void>;
  contact: ContactData; setContact: (v: ContactData) => Promise<void>;
  posts: BlogPost[]; setPosts: (v: BlogPost[]) => Promise<void>;
  saved: boolean; setSaved: (v: boolean) => void;
};

const Ctx = createContext<AdminCtx | null>(null);
export const useAdmin = () => useContext(Ctx)!;

const LS = {
  get: <T,>(key: string, def: T): T => {
    if (typeof window === 'undefined') return def;
    try {
      const v = localStorage.getItem(key);
      console.log(`📖 Loading ${key} from localStorage:`, v ? 'Found' : 'Not found');
      return v ? JSON.parse(v) : def;
    } catch (err) {
      console.error(`❌ Error loading ${key}:`, err);
      return def;
    }
  },
  set: (key: string, val: unknown) => {
    try {
      const json = JSON.stringify(val);
      const sizeMB = (new Blob([json]).size / (1024 * 1024)).toFixed(2);
      console.log(`💾 Saving ${key} to localStorage (${sizeMB}MB)...`);
      localStorage.setItem(key, json);
      console.log(`✅ Successfully saved ${key}`);
    } catch (err) {
      console.error(`❌ Failed to save ${key}:`, err);
      const sizeMB = (new Blob([JSON.stringify(val)]).size / (1024 * 1024)).toFixed(2);
      alert(
        `❌ Failed to save data!\n\n` +
        `Error: ${err instanceof Error ? err.message : 'Unknown error'}\n` +
        `Data size: ${sizeMB}MB\n\n` +
        `💡 Tip: localStorage has ~5MB limit. Images are automatically compressed, but if you have many images, try:\n` +
        `• Using fewer images\n` +
        `• Removing some additional images\n` +
        `• Deleting old posts you don't need`
      );
    }
  },
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [hero, setHeroState] = useState<HeroData>(defaultHero);
  const [experiences, setExpState] = useState<ExperienceItem[]>(defaultExperiences);
  const [story, setStoryState] = useState<StoryData>(defaultStory);
  const [contact, setContactState] = useState<ContactData>(defaultContact);
  const [posts, setPostsState] = useState<BlogPost[]>(defaultBlogPosts);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setHeroState(LS.get('admin_hero', defaultHero));
    setExpState(LS.get('admin_exp', defaultExperiences));
    setStoryState(LS.get('admin_story', defaultStory));
    setContactState(LS.get('admin_contact', defaultContact));
    setPostsState(LS.get('admin_posts', defaultBlogPosts));
  }, []);

  const persist = async (section: string, storageKey: string, value: unknown, applyState: () => void) => {
    try {
      const response = await fetch('/api/admin/site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, value }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = [payload.error, payload.details, payload.hint].filter(Boolean).join('\n');
        throw new Error(message || 'Failed to save site data');
      }

      LS.set(storageKey, value);
      applyState();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(storageKey + '_updated'));
      }
    } catch (error) {
      console.error(`❌ Failed to save ${section}:`, error);
      alert(error instanceof Error ? error.message : 'Failed to save site data');
    }
  };

  const setHero = async (v: HeroData) => {
    await persist('hero', 'admin_hero', v, () => setHeroState(v));
  };
  const setExperiences = async (v: ExperienceItem[]) => {
    await persist('experiences', 'admin_exp', v, () => setExpState(v));
  };
  const setStory = async (v: StoryData) => {
    await persist('story', 'admin_story', v, () => setStoryState(v));
  };
  const setContact = async (v: ContactData) => {
    await persist('contact', 'admin_contact', v, () => setContactState(v));
  };
  const setPosts = async (v: BlogPost[]) => {
    await persist('posts', 'admin_posts', v, () => setPostsState(v));
  };

  return (
    <Ctx.Provider value={{ hero, setHero, experiences, setExperiences, story, setStory, contact, setContact, posts, setPosts, saved, setSaved }}>
      {children}
    </Ctx.Provider>
  );
}
