import Button from "@/app/components/UI/shared/elements/Button";
import { useCommon } from "@/hooks/useCommon";

export default function AddBookButton() {
  const { commonT } = useCommon();
  return (
    <Button
      type="link"
      href="/profile/add-book"
      child={commonT("ADD_BOOK")}
      prefetch
    />
  );
}
