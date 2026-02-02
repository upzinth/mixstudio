-- Create a table for users (simulating auth.users)
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  full_name text,
  avatar_url text
);

-- Create a table for public profiles referencing the users table
create table profiles (
  id uuid references public.users(id) not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,
  referral_code text unique,
  referred_by text,

  constraint username_length check (char_length(username) >= 3)
);

-- Function to handle new user signup (adapted)
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url, referral_code)
  values (
    new.id,
    new.full_name,
    new.avatar_url,
    'USER-' || upper(substring(new.id::text from 1 for 6)) -- Generate a simple default referral code
  );
  return new;
end;
$$ language plpgsql;

-- Trigger the function every time a user is created
create trigger on_public_user_created
  after insert on public.users
  for each row execute procedure public.handle_new_user();
