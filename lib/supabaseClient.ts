import { createClient } from "@supabase/supabase-js";
import { Database } from "./db.types";

const supabaseAuth = (supabaseAccessToken?: string) => {
  if (supabaseAccessToken) {
    const supabase = createClient<Database>(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.SUPABASE_URL!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      }
    );
    return supabase;
  }
  throw new Error("No supabase access token");
};

export default supabaseAuth;
