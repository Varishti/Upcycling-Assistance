# Connecting the community gallery (about 10 minutes, free)

Out of the box, the Community tab saves posts on each person's own device. To let **everyone see the same posts**, connect a free Supabase database. No card is needed.

## 1. Create a Supabase project

1. Go to <https://supabase.com> and sign up (you can use your GitHub account).
2. Click **New project**. Give it a name such as `remake`, set a database password (save it somewhere), choose the region **South Asia (Mumbai)**, and click **Create new project**.
3. Wait a minute or two while the project is set up.

## 2. Create the posts table

1. In the left menu, open **SQL Editor** and click **New query**.
2. Paste everything below and click **Run**:

```sql
-- Table that holds community posts
create table public.posts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text check (char_length(name) <= 40),
  caption text not null check (char_length(caption) between 1 and 120),
  idea_id text,
  idea_name text,
  material text,
  image_url text not null,
  likes integer not null default 0
);

-- Row Level Security: anyone can read and add posts, nobody can edit or delete from the website
alter table public.posts enable row level security;

create policy "Anyone can read posts"
  on public.posts for select
  using (true);

create policy "Anyone can add posts"
  on public.posts for insert
  with check (likes = 0);

-- Likes go through this function, which can only add 1
create or replace function public.like_post(post_id bigint)
returns integer
language sql
security definer
set search_path = public
as $$
  update posts set likes = likes + 1 where id = post_id returning likes;
$$;

grant execute on function public.like_post(bigint) to anon;

-- Storage bucket for photos (public, so images can be shown)
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "Anyone can upload gallery photos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'gallery');
```

You should see **Success. No rows returned**.

## 3. Copy your project's URL and key

1. Open **Project Settings** (the gear icon) → **API**. On newer dashboards this is under **Project Settings → Data API** and **API Keys**.
2. Copy the **Project URL**, which looks like `https://abcdefghijk.supabase.co`.
3. Copy the **anon public** key, a long string starting with `eyJ`.

The anon key is designed to be public. The rules above control what it can do: read posts, add posts, and like them. Never paste the `service_role` key into the website.

## 4. Put them in the website

Open `js/config.js` in your GitHub repository, click the pencil (edit) icon, and fill in the two values:

```js
window.REMAKE_CONFIG = {
  supabaseUrl: "https://abcdefghijk.supabase.co",
  supabaseAnonKey: "eyJhbGciOi..."
};
```

Click **Commit changes**. After a minute, reload the site. The Community tab should now show **Live: everyone sees these posts**.

## Removing a post

Anyone can post, so check the gallery now and then. To remove a post:

1. Supabase dashboard → **Table Editor** → `posts` → select the row → **Delete**.
2. To remove its photo too: **Storage** → `gallery` → delete the file.

## If something doesn't work

| What you see | What to check |
|---|---|
| Still says "Device-only mode" | `js/config.js` values are empty, have a typo, or the site hasn't updated yet (wait a minute and hard-refresh). |
| "Couldn't load community posts" | The SQL in step 2 didn't run fully. Run it again in the SQL Editor. |
| Sharing fails | The `gallery` storage bucket or its upload policy is missing. Check **Storage** for a bucket named `gallery`. |
