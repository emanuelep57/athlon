// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jagursjndvedshygbxmh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZ3Vyc2puZHZlZHNoeWdieG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMTc2NzEsImV4cCI6MjAzNjY5MzY3MX0.IcrsYf-SOzKFReWMIVZB8M8vc4cpAQ88Go85zshpibs';
export const supabase = createClient(supabaseUrl, supabaseKey);
