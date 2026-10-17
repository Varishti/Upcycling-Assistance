/*
 * Community gallery settings
 * --------------------------
 * Leave these empty and the community gallery saves posts on each device only.
 * Fill them in (see SETUP.md) and everyone who opens the site sees the same posts.
 *
 * The "anon" key is meant to be public. It only allows what the database
 * rules in SETUP.md permit: reading posts, adding posts and liking them.
 */
window.REMAKE_CONFIG = {
  supabaseUrl: "",      // e.g. "https://abcdefghijk.supabase.co"
  supabaseAnonKey: ""   // the long "anon public" key from Project Settings → API
};
