import { Button } from "../../components/button/button";
import { Card } from "../../components/card/card";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Wrapper } from "../../styles/wrapper";
import { BannerStyle, Filter, MainContainer } from "./homepageStyle";
import {
  MdKeyboardDoubleArrowRight as Next,
  MdKeyboardDoubleArrowLeft as Back,
} from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { IPosts, ListPostsContext } from "../../contexts/ListPostsContext";
import { InputStyle } from "../../components/input/inputStyle";
import { UserContext } from "../../contexts/UserContext";

export const HomePage = () => {
  const [filterClickMobile, setFilterClickMobile] = useState(false);
  const [showClearFiltersButton, setShowClearFiltersButton] = useState(false);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    color: "",
    year: "",
    minKm: "",
    maxKm: "",
    minPrice: "",
    maxPrice: "",
    fuelType: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { postsInfo } = useContext(ListPostsContext);
  const { user } = useContext(UserContext);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({ ...prevState, minPrice: e.target.value }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({ ...prevState, maxPrice: e.target.value }));
  };

  const handleFuelTypeClick = (fuelType: string) => {
    setFilters((prevState) => ({ ...prevState, fuelType }));
  };

  const filterPosts = (posts: IPosts[]) => {
    return posts.filter((post) => {
      const {
        brand,
        model,
        color,
        year,
        minKm,
        maxKm,
        minPrice,
        maxPrice,
        fuelType,
      } = filters;

      const brandMatch = !brand || post.mark === brand;
      const modelMatch = !model || post.model === model;
      const colorMatch =
        !color || post.color.toLowerCase() === color.toLowerCase();
      const yearMatch = !year || post.year === year;
      const fuelTypeMatch =
        !fuelType || post.fuelType.toLowerCase() === fuelType.toLowerCase();
      const minKmMatch = !minKm || parseInt(post.kilometers) >= parseInt(minKm);
      const maxKmMatch = !maxKm || parseInt(post.kilometers) <= parseInt(maxKm);
      const minPriceMatch =
        !minPrice || parseInt(post.price) >= parseInt(minPrice);
      const maxPriceMatch =
        !maxPrice || parseInt(post.price) <= parseInt(maxPrice);

      return (
        brandMatch &&
        modelMatch &&
        colorMatch &&
        yearMatch &&
        minKmMatch &&
        maxKmMatch &&
        minPriceMatch &&
        maxPriceMatch &&
        fuelTypeMatch
      );
    });
  };

  const filteredPosts = filterPosts(postsInfo);

  const totalPages = Math.ceil(filteredPosts.length / 9);

  const paginatedPosts = (posts: IPosts[], page: number) => {
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    return posts.slice(startIndex, endIndex);
  };

  const uniqueYears = Array.from(new Set(postsInfo.map((post) => post.year)));

  const capitalizeFirstLetter = (str: string): string => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const uniqueFuelTypes = Array.from(
    new Set(postsInfo.map((post) => post.fuelType))
  )
    .filter(Boolean)
    .map((fuelType: string) => capitalizeFirstLetter(fuelType));

  const hasActiveFilters = () => {
    return Object.values(filters).some((filterValue) => filterValue !== "");
  };

  useEffect(() => {
    setShowClearFiltersButton(hasActiveFilters());
  }, [filters]);

  const handleBrandClick = (brand: string) => {
    setFilters((prevState) => ({ ...prevState, brand }));
    setDisplayedModels(filterModelsByBrand(brand));
    setDisplayedColors(filterColorsByBrand(brand));
    setDisplayedYears(filterYearsByBrand(brand));
    setDisplayedFuelTypes(filterFuelTypesByBrand(brand));
  };

  const handleModelClick = (model: string) => {
    setFilters((prevState) => ({ ...prevState, model }));
    setDisplayedColors(filterColorsByModel(filters.brand, model));
    setDisplayedYears(filterYearsByModel(filters.brand, model));
    setDisplayedFuelTypes(filterFuelTypesByModel(filters.brand, model));
  };

  const handleColorClick = (color: string) => {
    setFilters((prevState) => ({ ...prevState, color }));
  };

  const handleYearClick = (year: string) => {
    setFilters((prevState) => ({ ...prevState, year }));
  };

  const handleMinKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({ ...prevState, minKm: e.target.value }));
  };

  const handleMaxKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({ ...prevState, maxKm: e.target.value }));
  };

  const uniqueColors = Array.from(
    new Set(postsInfo.map((post) => post.color))
  ).map((color: string) => capitalizeFirstLetter(color));

  const uniqueBrands = Array.from(new Set(postsInfo.map((post) => post.mark)));

  const uniqueModels = Array.from(new Set(postsInfo.map((post) => post.model)));

  const HandleFilterMobileClick = () => {
    setFilterClickMobile(!filterClickMobile);
  };

  const [displayedModels, setDisplayedModels] =
    useState<string[]>(uniqueModels);
  const [displayedColors, setDisplayedColors] =
    useState<string[]>(uniqueColors);
  const [displayedYears, setDisplayedYears] = useState<string[]>(uniqueYears);
  const [displayedFuelTypes, setDisplayedFuelTypes] =
    useState<string[]>(uniqueFuelTypes);

  const filterModelsByBrand = (selectedBrand: string): string[] => {
    if (!selectedBrand) return uniqueModels;
    const models = postsInfo
      .filter((post) => post.mark === selectedBrand)
      .map((post) => post.model);

    return Array.from(new Set(models));
  };

  const filterColorsByBrand = (selectedBrand: string): string[] => {
    if (!selectedBrand) return uniqueColors;
    const colors = postsInfo
      .filter((post) => post.mark === selectedBrand)
      .map((post) => post.color);
    return Array.from(new Set(colors)).map((color: string) =>
      capitalizeFirstLetter(color)
    );
  };

  const filterYearsByBrand = (selectedBrand: string): string[] => {
    if (!selectedBrand) return uniqueYears;
    const years = postsInfo
      .filter((post) => post.mark === selectedBrand)
      .map((post) => post.year);
    return Array.from(new Set(years));
  };

  const filterFuelTypesByBrand = (selectedBrand: string): string[] => {
    if (!selectedBrand) return uniqueFuelTypes;
    const fuelTypes = postsInfo
      .filter((post) => post.mark === selectedBrand)
      .map((post) => post.fuelType);
    return Array.from(new Set(fuelTypes)).map((fuelType: string) =>
      capitalizeFirstLetter(fuelType)
    );
  };

  const filterColorsByModel = (
    selectedBrand: string,
    selectedModel: string
  ): string[] => {
    if (!selectedBrand || !selectedModel) return uniqueColors;
    const colors = postsInfo
      .filter(
        (post) => post.mark === selectedBrand && post.model === selectedModel
      )
      .map((post) => post.color);

    return Array.from(new Set(colors)).map((color: string) =>
      capitalizeFirstLetter(color)
    );
  };

  const filterYearsByModel = (
    selectedBrand: string,
    selectedModel: string
  ): string[] => {
    if (!selectedBrand || !selectedModel) return uniqueYears;
    const years = postsInfo
      .filter(
        (post) => post.mark === selectedBrand && post.model === selectedModel
      )
      .map((post) => post.year);

    return Array.from(new Set(years));
  };

  const filterFuelTypesByModel = (
    selectedBrand: string,
    selectedModel: string
  ): string[] => {
    if (!selectedBrand || !selectedModel) return uniqueFuelTypes;
    const fuelTypes = postsInfo
      .filter(
        (post) => post.mark === selectedBrand && post.model === selectedModel
      )
      .map((post) => post.fuelType);

    return Array.from(new Set(fuelTypes)).map((fuelType: string) =>
      capitalizeFirstLetter(fuelType)
    );
  };

  const clearFilters = () => {
    setFilters({
      brand: "",
      model: "",
      color: "",
      year: "",
      minKm: "",
      maxKm: "",
      minPrice: "",
      maxPrice: "",
      fuelType: "",
    });
    setDisplayedModels([]);
    setDisplayedColors([]);
    setDisplayedFuelTypes([]);
    setDisplayedYears([]);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  const handleLastPageClick = () => {
    setCurrentPage(totalPages);
  };

  return (
    <Wrapper>
      {user ? <Header type="dashboard" /> : <Header />}
      <BannerStyle>
        <h1>Motors Shop</h1>
        <p>A melhor plataforma de anúncios de carros do país!</p>
      </BannerStyle>
      <MainContainer className="container" length={filteredPosts.length}>
        <section className="wrapperContainer">
          <div className="cardsContainer">
            {filteredPosts.length > 0 ? (
              paginatedPosts(filteredPosts, currentPage).map((post) => (
                <Card key={post.id} post={post} type="home" />
              ))
            ) : (
              <p className="messageNotFoundCar">Não há carros disponíveis</p>
            )}
          </div>
          <div className="filterContainer">
            <Button typeStyle="colorBrand1" onClick={HandleFilterMobileClick}>
              Filtros
            </Button>
            <Filter filterClickMobile={filterClickMobile}>
              <div className="containerClickFilterModal">
                <p>Filtro</p>
                <button onClick={HandleFilterMobileClick}>X</button>
              </div>
              <h2>Marca</h2>
              <div>
                {uniqueBrands.map((brand) => (
                  <Button
                    key={brand}
                    typeStyle="filter"
                    onClick={() => handleBrandClick(brand)}
                  >
                    {capitalizeFirstLetter(brand)}
                  </Button>
                ))}
              </div>
              <h2>Modelo</h2>
              <div>
                {displayedModels.map((model, index) => (
                  <Button
                    key={index}
                    typeStyle="filter"
                    onClick={() => handleModelClick(model)}
                  >
                    {capitalizeFirstLetter(model)}
                  </Button>
                ))}
              </div>
              <h2>Cor</h2>
              <div>
                {displayedColors.map((color: string, index: number) => (
                  <Button
                    key={index}
                    typeStyle="filter"
                    onClick={() => handleColorClick(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
              <h2>Ano</h2>
              <div>
                {displayedYears.map((year: string, index: number) => (
                  <Button
                    key={index}
                    typeStyle="filter"
                    onClick={() => handleYearClick(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
              <h2>Combustível</h2>
              <div>
                {displayedFuelTypes.map((fuelType: string, index: number) => (
                  <Button
                    key={index}
                    typeStyle="filter"
                    onClick={() => handleFuelTypeClick(fuelType)}
                  >
                    {fuelType}
                  </Button>
                ))}
              </div>
              <h2>KM</h2>
              <div>
                <div className="inputContainer">
                  <InputStyle
                    typeStyled="filter"
                    placeholder="mínimo"
                    value={filters.minKm}
                    onChange={handleMinKmChange}
                  />
                  <InputStyle
                    typeStyled="filter"
                    placeholder="máximo"
                    value={filters.maxKm}
                    onChange={handleMaxKmChange}
                  />
                </div>
              </div>
              <h2>Preço</h2>
              <div>
                <div className="inputContainer">
                  <InputStyle
                    typeStyled="filter"
                    placeholder="mínimo"
                    value={filters.minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <InputStyle
                    typeStyled="filter"
                    placeholder="máximo"
                    value={filters.maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </div>
              {showClearFiltersButton && (
                <Button
                  typeStyle="colorBrand1"
                  onClick={HandleFilterMobileClick}
                >
                  Ver Anúncios
                </Button>
              )}
              {showClearFiltersButton && (
                <Button typeStyle="colorBrand1" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              )}
            </Filter>
          </div>
        </section>
        <div className="paginationContainer">
          {currentPage > 1 && (
            <>
              <button onClick={handlePreviousClick}>Voltar</button>
              <button onClick={handleFirstPageClick}>
                <Back />
              </button>
            </>
          )}
          <p>
            {currentPage} <span>de {totalPages} </span>
          </p>
          {currentPage < totalPages && (
            <>
              <button onClick={handleNextClick}>Seguinte</button>
              <button onClick={handleLastPageClick}>
                <Next />
              </button>
            </>
          )}
        </div>
      </MainContainer>
      <Footer />
    </Wrapper>
  );
};
