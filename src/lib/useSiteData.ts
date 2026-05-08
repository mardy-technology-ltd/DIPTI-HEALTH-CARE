'use client';

import { useState, useEffect } from 'react';
import {
  defaultHero, defaultExperiences, defaultStory, defaultContact, defaultBlogPosts,
  HeroData, ExperienceItem, StoryData, ContactData, BlogPost, Message,
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

// Generate SEO-friendly slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-') // spaces to hyphens
    .replace(/-+/g, '-') // collapse multiple hyphens
    .slice(0, 60); // limit length
};

export function usePosts() {
  const [data, setData] = useState<BlogPost[]>(defaultBlogPosts);
  useEffect(() => {
    let posts = lsGet('admin_posts', defaultBlogPosts);
    
    console.log('📊 Raw posts from localStorage:', posts.map(p => ({ id: p.id, slug: p.slug, title: p.title })));
    
    // Migration: Add slugs to old posts that don't have them
    let needsMigration = false;
    posts = posts.map(post => {
      if (!post.slug) {
        needsMigration = true;
        const newSlug = post.title ? generateSlug(post.title) : `post-${post.id}`;
        console.log(`🔄 Migrating post ${post.id}: "${post.title}" → slug: "${newSlug}"`);
        return { ...post, slug: newSlug };
      }
      return post;
    });
    
    // Save migrated data back to localStorage
    if (needsMigration) {
      try {
        localStorage.setItem('admin_posts', JSON.stringify(posts));
        console.log('✅ Migrated blog posts with slugs, saved to localStorage');
        console.log('📊 After migration:', posts.map(p => ({ id: p.id, slug: p.slug, title: p.title })));
      } catch (e) {
        console.error('❌ Failed to save migrated posts:', e);
      }
    }
    
    setData(posts);

    // Listen for storage events (cross-tab updates)
    const handleStorage = () => {
      const updated = lsGet('admin_posts', defaultBlogPosts);
      console.log('🔄 Storage event: reloading posts');
      setData(updated);
    };
    window.addEventListener('storage', handleStorage);

    // Listen for custom events (same-tab updates)
    const handleUpdate = () => {
      const updated = lsGet('admin_posts', defaultBlogPosts);
      console.log('🔄 Custom event: reloading posts');
      setData(updated);
    };
    window.addEventListener('admin_posts_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('admin_posts_updated', handleUpdate);
    };
  }, []);
  return data;
}

// Messages Hook
export function useMessages() {
  const [data, setData] = useState<Message[]>([]);
  
  useEffect(() => {
    const messages = lsGet('admin_messages', []);
    setData(messages);

    // Listen for storage events (cross-tab updates)
    const handleStorage = () => {
      const updated = lsGet('admin_messages', []);
      setData(updated);
    };
    window.addEventListener('storage', handleStorage);

    // Listen for custom events (same-tab updates)
    const handleUpdate = () => {
      const updated = lsGet('admin_messages', []);
      setData(updated);
    };
    window.addEventListener('admin_messages_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('admin_messages_updated', handleUpdate);
    };
  }, []);
  
  return data;
}

// Add a new message (called from contact form)
export function addMessage(message: Omit<Message, 'id' | 'date' | 'read'>) {
  if (typeof window === 'undefined') return;
  
  try {
    const messages = lsGet<Message[]>('admin_messages', []);
    const newMessage: Message = {
      ...message,
      id: Date.now(),
      date: new Date().toISOString(),
      read: false,
    };
    
    const updated = [newMessage, ...messages];
    localStorage.setItem('admin_messages', JSON.stringify(updated));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('admin_messages_updated'));
    
    console.log('✅ Message saved:', newMessage);
    return true;
  } catch (e) {
    console.error('❌ Failed to save message:', e);
    return false;
  }
}
