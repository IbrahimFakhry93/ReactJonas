//* copy and paste this down from initializing from API DOCS in Supabase

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dbxshcsearexonqnmrwr.supabase.co";

//* copy Project API Key  (anon key) from API settings in Supabase
//* this key is safe to use in a browser if we enabled row level security.
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieHNoY3NlYXJleG9ucW5tcndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxMjUyNjAsImV4cCI6MjAzMzcwMTI2MH0.HhNTpjltV2feQPo0Aeiaxw7NdlsADhuVKG6DjWMTqOg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; //* export supabase client

//* So let's say export default, supabase,
//* and then in some other file we can import this supabase client and start querying.

// you might be wondering that if we are

// exposing our supabase key on the client, that

// then some malicious user might be able to hack our database.

// And the answer

// Would actually be true

// if we didn't activate row level security.

// But since we did

// anyone who has this key can only do whatever we allowed

// in the row level security policies.

// And so right now remember

// that the only thing that we allow is to read data

// from our four tables.

// And so that's the reason why it is completely

// safe to expose this key here to the client.

// So even if anyone steals this, they can't do anything

// with it unless we allow it in a role level security policy.

//*==============

// you might be wondering that if we are

// exposing our supabase key on the client, that

// then some malicious user might be able to hack our database.

// And the answer

// Would actually be true

// if we didn't activate row level security.

// But since we did

// anyone who has this key can only do whatever we allowed

// in the row level security policies.

// And so right now remember

// that the only thing that we allow is to read data

// from our four tables.

// And so that's the reason why it is completely

// safe to expose this key here to the client.

// So even if anyone steals this, they can't do anything

// with it unless we allow it in a role level security policy.
