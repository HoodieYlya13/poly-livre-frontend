import Icon from "@/app/components/UI/shared/elements/SVGs/Icon";
import { IconName } from "@/app/components/UI/shared/elements/SVGs/IconRegistry";
import { useTranslations } from "next-intl";

interface TileProps {
  icon: IconName;
  number: string;
  title: string;
  description: string;
}

function Tile({ icon, number, title, description }: TileProps) {
  return (
    //{custom-shadow custom-shadow-hover aspect-5/4}
    <div className="flex bg-secondary/50 rounded-xl w-full max-w-xs overflow-hidden @container">
      <div className="flex flex-col gap-3 @2xs:gap-4 @xs:gap-5 p-3 @2xs:p-4 @xs:p-5 w-full">
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="size-10 @3xs:size-12 rounded-md bg-primary text-secondary flex items-center justify-center">
            <Icon name={icon} className="size-3/5" />
          </div>

          <div className="text-3xl @3xs:text-4xl text-primary/15 font-black">
            {number}
          </div>
        </div>

        <h3 className="font-bold text-sm @3xs:text-base @xs:text-lg">
          {title}
        </h3>

        <p className="text-xs @3xs:text-sm @xs:text-sm">{description}</p>
      </div>
    </div>
  );
}

interface TileData {
  id: string;
  number: string;
  icon: IconName;
}

const TILES_DATA: TileData[] = [
  {
    id: "STEP_1",
    number: "01",
    icon: "search",
  },
  {
    id: "STEP_2",
    number: "02",
    icon: "book",
  },
  {
    id: "STEP_3",
    number: "03",
    icon: "transport",
  },
  {
    id: "STEP_4",
    number: "04",
    icon: "return",
  },
];

export default function InformationTiles() {
  const t = useTranslations("HOME_PAGE.HOW_IT_WORKS.STEPS");

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 justify-items-center mx-auto max-w-2xl lg:max-w-8xl">
      {TILES_DATA.map((tile) => (
        <Tile
          key={tile.id}
          icon={tile.icon}
          number={tile.number}
          title={t(`${tile.id}.TITLE`)}
          description={t(`${tile.id}.DESCRIPTION`)}
        />
      ))}
    </div>
  );
}
