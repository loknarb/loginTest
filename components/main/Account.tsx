import { useState, useEffect, useCallback } from "react";
import { useUser, useSupabaseClient, Session } from "@supabase/auth-helpers-react";
import { Database } from "../../lib/db.types";
import Button from "./Button";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [website, setWebsite] = useState<Profiles["website"]>(null);
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const {
        data,
        error: err,
        status,
      } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (err && status !== 406) {
        throw Error(err.message);
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [supabase, user]);

  useEffect(() => {
    getProfile();
  }, [session, getProfile]);

  async function updateProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error: err } = await supabase.from("profiles").upsert(updates);
      if (err) {
        throw Error(err.message);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <div className="error">{error.message}</div>}
      <div className="form-widget">
        <div>
          <label htmlFor="email">
            Email
            <input id="email" type="text" value={session.user.email} disabled />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username
            <input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="website">
            Website
            <input
              id="website"
              type="website"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div>
          <button
            type="button"
            className="block button primary"
            onClick={() => updateProfile()}
            disabled={loading}>
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>

        <div>
          <Button type="button" className="block button" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
}
