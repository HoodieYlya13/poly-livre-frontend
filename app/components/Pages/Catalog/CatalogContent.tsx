"use client";

import { Book } from "@/models/book.models";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import BookTiles from "../Home/shared/TrendingBooks/BookTiles";
import AddBookButton from "./shared/AddBookButton";
import CategoryFilter from "./Filters/CategoryFilter";
import PriceRangeSlider from "./Filters/PriceRangeSlider";
import Select from "../../UI/shared/elements/Select";

interface CatalogContentProps {
  books: Book[];
  ownerId?: string;
  myBooks: boolean;
  authenticated: boolean;
}

export default function CatalogContent({
  books,
  myBooks,
  authenticated,
}: CatalogContentProps) {
  const t = useTranslations("CATALOG_PAGE");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allStyles = useMemo(() => {
    const styles = new Set<string>();
    books.forEach((book) => {
      book.styles.forEach((style) => styles.add(style));
    });
    return Array.from(styles).sort();
  }, [books]);

  const { minPrice: baseMinPrice, maxPrice: baseMaxPrice } = useMemo(() => {
    if (books.length === 0) return { minPrice: 0, maxPrice: 100 };
    const prices = books.map((b) => b.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, [books]);

  const selectedStyles = useMemo(() => {
    const param = searchParams.get("styles");
    return param ? param.split(",") : [];
  }, [searchParams]);

  const priceRange = useMemo<[number, number]>(() => {
    const minParam = searchParams.get("minPrice");
    const maxParam = searchParams.get("maxPrice");
    return [
      minParam ? Number(minParam) : baseMinPrice,
      maxParam ? Number(maxParam) : baseMaxPrice,
    ];
  }, [searchParams, baseMinPrice, baseMaxPrice]);

  const sort = searchParams.get("sort") || "";

  const filteredBooks = useMemo(() => {
    let result = books.filter((book) => {
      if (selectedStyles.length > 0) {
        const hasStyle = book.styles.some((s) => selectedStyles.includes(s));
        if (!hasStyle) return false;
      }

      if (book.price < priceRange[0] || book.price > priceRange[1]) {
        return false;
      }

      return true;
    });

    if (sort) {
      result = [...result].sort((a, b) => {
        switch (sort) {
          case "PRICE_ASC":
            return a.price - b.price;
          case "PRICE_DESC":
            return b.price - a.price;
          case "NEWEST":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "OLDEST":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
    }

    return result;
  }, [books, selectedStyles, priceRange, sort]);

  const updateUrl = (
    newStyles: string[],
    newPrice: [number, number],
    newSort: string,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStyles.length > 0) {
      params.set("styles", newStyles.join(","));
    } else {
      params.delete("styles");
    }

    if (newPrice[0] !== baseMinPrice)
      params.set("minPrice", newPrice[0].toString());
    else params.delete("minPrice");

    if (newPrice[1] !== baseMaxPrice)
      params.set("maxPrice", newPrice[1].toString());
    else params.delete("maxPrice");

    if (newSort) params.set("sort", newSort);
    else params.delete("sort");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleStyleChange = (styles: string[]) => {
    updateUrl(styles, priceRange, sort);
  };

  const handlePriceChange = (min: number, max: number) => {
    updateUrl(selectedStyles, [min, max], sort);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    updateUrl(selectedStyles, priceRange, val);
  };

  const resetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const sortOptions = [
    { value: "PRICE_ASC", label: t("SORT.OPTIONS.PRICE_ASC") },
    { value: "PRICE_DESC", label: t("SORT.OPTIONS.PRICE_DESC") },
    { value: "NEWEST", label: t("SORT.OPTIONS.NEWEST") },
    { value: "OLDEST", label: t("SORT.OPTIONS.OLDEST") },
  ];

  return (
    <div className="flex flex-col gap-5 py-10 px-5">
      <h1 className="text-2xl">{t("TITLE")}</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="flex flex-col gap-8 w-full md:w-64 shrink-0">
          <h2 className="text-xl font-semibold hidden md:block">
            {t("FILTERS.TITLE")}
          </h2>

          <CategoryFilter
            styles={allStyles}
            selectedStyles={selectedStyles}
            onChange={handleStyleChange}
          />

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg">{t("FILTERS.PRICE")}</h3>
            <div className="px-2">
              <PriceRangeSlider
                min={baseMinPrice}
                max={baseMaxPrice}
                minVal={priceRange[0]}
                maxVal={priceRange[1]}
                onChange={handlePriceChange}
              />
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-primary transition-colors text-left"
          >
            {t("FILTERS.RESET")}
          </button>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-end items-center">
            <div className="w-48">
              <Select
                id="sort"
                label={t("SORT.LABEL")}
                options={sortOptions}
                value={sort}
                onChange={handleSortChange}
                secondary
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full items-center">
            {myBooks && <AddBookButton />}

            {filteredBooks.length > 0 ? (
              <BookTiles
                books={filteredBooks}
                myBooks={myBooks || false}
                className=" @4xl:grid-cols-3 @4xl:max-w-5xl"
                authenticated={!!authenticated}
              />
            ) : (
              <p className="text-gray-500 mt-10 text-center">
                {t("FILTERS.NO_RESULTS")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
