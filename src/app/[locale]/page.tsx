import { useTranslations } from "next-intl";

import RegisterForm from "@meet/feature/login/components/register-form";

const Home = () => {
  const t = useTranslations("HomePage");
  
  return (
    <div className="container mx-auto space-y-4">
      <h1>Example form</h1>
      <p>{t("title")}</p>
      <RegisterForm />
    </div>
  );
};
 
export default Home;
