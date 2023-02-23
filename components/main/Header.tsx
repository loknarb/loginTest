import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { Database } from "../../lib/db.types";
import Button from "./Button";

const Header = () => {
  const { t } = useTranslation("common");
  const supabase = useSupabaseClient<Database>();
  return (
    <div className="">
      <div className="flex-1">
        <a href=" " className="text-xl">
          {t("welcome")}
        </a>
      </div>
      <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
    </div>
  );
};
export default Header;
