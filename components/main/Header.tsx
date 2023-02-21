import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../lib/db.types";
import Button from "./Button";

const Header = () => {
  const supabase = useSupabaseClient<Database>();
  return (
    <div className="">
      <div className="flex-1">
        <a href=" " className="text-xl">
          Welcome
        </a>
      </div>
      <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
    </div>
  );
};
export default Header;
