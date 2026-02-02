-- Insert a test user
INSERT INTO public.users (email, full_name, avatar_url)
VALUES ('testuser@example.com', 'Test User', 'https://example.com/avatar.jpg')
RETURNING id, email;

-- Verify that the trigger automatically created a profile
SELECT * FROM public.profiles WHERE username = 'Test User';
