import Button from "../elements/Button";

export default function BookStyles({ styles }: { styles: string[] }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 mx-auto w-fit">
        {styles.map((style) => (
          <Button
            key={style}
            type="link"
            href={`/styles/${style}`}
            child={style}
            className="px-2 py-1 text-sm"
            secondary
          />
        ))}
      </div>
    </div>
  );
}
