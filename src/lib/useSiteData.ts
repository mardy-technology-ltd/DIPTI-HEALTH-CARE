'use client';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
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
  useEffect(() => {
    const fetchHeroData = async () => {
      const { data: heroData, error } = await supabase
        .from('hero')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching hero data from Supabase. Falling back to local data.', error);
        // Fallback to localStorage or default data if Supabase fails
        setData(lsGet('admin_hero', defaultHero));
      } else if (heroData) {
        setData({ ...defaultHero, ...heroData });
      }
    };

    fetchHeroData();
  }, []);
  return data;
}

export function useExperiences() {
  const [data, setData] = useState<ExperienceItem[]>(defaultExperiences);
  useEffect(() => {
    const fetchExperiences = async () => {
      const { data: experiencesData, error } = await supabase
        .from('experiences')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching experiences data:', error);
        setData(lsGet('admin_exp', defaultExperiences)); // Fallback
      } else if (experiencesData) {
        setData(experiencesData);
      }
    };

    fetchExperiences();
  }, []);
  return data;
}

export function useStory() {
  const [data, setData] = useState<StoryData>(defaultStory);
  useEffect(() => {
    const fetchStory = async () => {
      const { data: storyData, error } = await supabase
        .from('story')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching story data:', error);
        setData(lsGet('admin_story', defaultStory)); // Fallback
      } else if (storyData) {
        setData(storyData);
      }
    };

    fetchStory();
  }, []);
  return data;
}

export function useContact() {
  const [data, setData] = useState<ContactData>(defaultContact);
  useEffect(() => {
    const fetchContact = async () => {
      const { data: contactData, error } = await supabase
        .from('contact')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching contact data:', error);
        setData(lsGet('admin_contact', defaultContact)); // Fallback
      } else if (contactData) {
        setData(contactData);
      }
    };

    fetchContact();
  }, []);
  return data;
}

export async function addMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<{ error: Error | null }> {
  const { error } = await supabase.from('messages').insert([message]);
  if (error) {
    console.error('Error sending message:', error);
    return { error: new Error('Failed to send message. Please try again later.') };
  }
  return { error: null };
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
    const fetchPosts = async () => {
      const { data: postsData, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        setData(lsGet('admin_posts', defaultBlogPosts)); // Fallback
      } else if (postsData) {
        setData(postsData);
      }
    };

    fetchPosts();
  }, []);
  return data;
}

export function useMessages() {
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setData(messages || []);
      }
      setLoading(false);
    };

    fetchMessages();

    // Listen for new messages
    const channel = supabase
      .channel('realtime messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setData((prevMessages) => [payload.new as Message, ...prevMessages]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { messages: data, loading };
}
