-- Seed data for Shoply database

-- Insert sample categories
INSERT INTO public.categories (id, name) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Electronics'),
('550e8400-e29b-41d4-a716-446655440002', 'Clothing'),
('550e8400-e29b-41d4-a716-446655440003', 'Home & Garden'),
('550e8400-e29b-41d4-a716-446655440004', 'Sports'),
('550e8400-e29b-41d4-a716-446655440005', 'Books')
ON CONFLICT (id) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (id, name, description, price, discount, stock, category_id, images) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 299.99, 0.1, 50, '550e8400-e29b-41d4-a716-446655440001', ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800']),
('550e8400-e29b-41d4-a716-446655440011', 'Smart Watch', 'Fitness tracking smartwatch with heart rate monitor and GPS', 199.99, 0, 75, '550e8400-e29b-41d4-a716-446655440001', ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800']),
('550e8400-e29b-41d4-a716-446655440012', 'Cotton T-Shirt', 'Comfortable 100% organic cotton t-shirt in various colors', 29.99, 0, 100, '550e8400-e29b-41d4-a716-446655440002', ARRAY['https://images.unsplash.com/photo-1521572163474-6844f3cf9ab3?w=800']),
('550e8400-e29b-41d4-a716-446655440013', 'Yoga Mat', 'Non-slip exercise yoga mat with carrying strap', 39.99, 0.2, 30, '550e8400-e29b-41d4-a716-446655440004', ARRAY['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800']),
('550e8400-e29b-41d4-a716-446655440014', 'JavaScript Guide', 'Complete guide to modern JavaScript programming', 49.99, 0, 25, '550e8400-e29b-41d4-a716-446655440005', ARRAY['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'])
ON CONFLICT (id) DO NOTHING;

-- Insert sample users (password is 'password123' for all)
INSERT INTO public.users (id, name, email, password_hash, role) VALUES
('550e8400-e29b-41d4-a716-446655440100', 'Admin User', 'admin@shoply.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJg/9q6mO', 'admin'),
('550e8400-e29b-41d4-a716-446655440101', 'John Doe', 'john@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJg/9q6mO', 'customer'),
('550e8400-e29b-41d4-a716-446655440102', 'Jane Smith', 'jane@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJg/9q6mO', 'customer')
ON CONFLICT (email) DO NOTHING;
