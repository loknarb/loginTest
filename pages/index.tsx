import Head from "next/head";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Inter } from "@next/font/google";
import { useCallback, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../components/main/Header";
import Body from "../components/main/Body";
import { Database } from "../lib/db.types";
import Button from "../components/main/Button";

const inter = Inter({ subsets: ["latin"] });
type Props = { [key: string]: any };
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState<string | null>("");
  const [error, setError] = useState<string | null>("");
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const { t } = useTranslation("common");
  const fetchFullName = useCallback(async () => {
    try {
      const { data } = await supabase.from("profiles").select("full_name");
      if (data && data.length > 0) {
        setName(data[0].full_name);
      }
    } catch (err) {
      setError(`Error fetching full name:", ${err}`);
    }
  }, [supabase]);
  useEffect(() => {
    fetchFullName();
  }, [fetchFullName, supabase]);
  const changeTo = router.locale === "en" ? "de" : "en";
  // <Account session={session} />
  return (
    <>
      <Head>
        <title>{session ? `${name}` : t("login")}</title>
        <meta name="description" content="Generated by no one ;)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/" locale={changeTo}>
        <Button>{t("change-locale", { changeTo })}</Button>
      </Link>
      {error && <div className="error">{error}</div>}
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google", "github"]}
        />
      ) : (
        <main className={inter.className}>
          <Header />
          <Body />
        </main>
      )}
    </>
  );
};
export default Home;
