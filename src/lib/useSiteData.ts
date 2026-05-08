'use client';

import { useState, useEffect } from 'react';
import {
  defaultHero, defaultExperiences, defaultStory, defaultContact, defaultBlogPosts,
  HeroData, ExperienceItem, StoryData, ContactData, BlogPost,
} from './siteData';

function lsGet<T>(key: string, def: T): T {
  if (typeof window === 'undefined') return def;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : def;
  } catch {
    return def;
  }
}

export function useHero() {
  const [data, setData] = useState<HeroData>(defaultHero);
  useEffect(() => { setData(lsGet('admin_hero', defaultHero)); }, []);
  return data;
}

export function useExperiences() {
  const [data, setData] = useState<ExperienceItem[]>(defaultExperiences);
  useEffect(() => { setData(lsGet('admin_exp', defaultExperiences)); }, []);
  return data;
}

export function useStory() {
  const [data, setData] = useState<StoryData>(defaultStory);
  useEffect(() => { setData(lsGet('admin_story', defaultStory)); }, []);
  return data;
}

export function useContact() {
  const [data, setData] = useState<ContactData>(defaultContact);
  useEffect(() => { setData(lsGet('admin_contact', defaultContact)); }, []);
  return data;
}

export function usePosts() {
  const [data, setData] = useState<BlogPost[]>(defaultBlogPosts);
  useEffect(() => {
    setData(lsGet('admin_posts', defaultBlogPosts));

    // Listen for storage events (cross-tab updates)
    const handleStorage = () => {
      setData(lsGet('admin_posts', defaultBlogPosts));
    };
    window.addEventListener('storage', handleStorage);

    // Listen for custom events (same-tab updates)
    const handleUpdate = () => {
      setData(lsGet('admin_posts', defaultBlogPosts));
    };
    window.addEventListener('admin_posts_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('admin_posts_updated', handleUpdate);
    };
  }, []);
  return data;
}
