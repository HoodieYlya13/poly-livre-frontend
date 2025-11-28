import AuthTestingMode from "@/app/components/Pages/AuthTest/AuthTestingMode";
import PageBuilder from "@/app/components/UI/PageBuilder/PageBuilder";

export default function AuthTestingModePage() {
  return (
    <PageBuilder padding={false} showNavBar={false} showFooter={false} auroraBackground={true}>
      <AuthTestingMode />
    </PageBuilder>
  );
}