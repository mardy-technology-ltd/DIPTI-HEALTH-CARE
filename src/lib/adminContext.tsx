'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  defaultHero, defaultExperiences, defaultStory, defaultContact, defaultBlogPosts,
  HeroData, ExperienceItem, StoryData, ContactData, BlogPost,
} from '@/lib/siteData';

type AdminCtx = {
  hero: HeroData; setHero: (v: HeroData) => void;
  experiences: ExperienceItem[]; setExperiences: (v: ExperienceItem[]) => void;
  story: StoryData; setStory: (v: StoryData) => void;
  contact: ContactData; setContact: (v: ContactData) => void;
  posts: BlogPost[]; setPosts: (v: BlogPost[]) => void;
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

  const persist = (key: string, val: unknown) => {
    LS.set(key, val);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // Dispatch custom event for same-tab real-time sync
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(key + '_updated'));
    }
  };

  const setHero = (v: HeroData) => { setHeroState(v); persist('admin_hero', v); };
  const setExperiences = (v: ExperienceItem[]) => { setExpState(v); persist('admin_exp', v); };
  const setStory = (v: StoryData) => { setStoryState(v); persist('admin_story', v); };
  const setContact = (v: ContactData) => { setContactState(v); persist('admin_contact', v); };
  const setPosts = (v: BlogPost[]) => { setPostsState(v); persist('admin_posts', v); };

  return (
    <Ctx.Provider value={{ hero, setHero, experiences, setExperiences, story, setStory, contact, setContact, posts, setPosts, saved, setSaved }}>
      {children}
    </Ctx.Provider>
  );
}
