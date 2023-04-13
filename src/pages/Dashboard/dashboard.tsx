import { useContext, useState, useEffect } from "react";
import { ListCarsKenzieContext } from "../../contexts/ListCarsKenzieContext";
import { PostCard } from "../../components/postCard/PostCard";
import { ListPostsContext } from "../../contexts/ListPostsContext";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { Button } from "../../components/button/button";
import { IPosts } from "../../contexts/ListPostsContext";
import {
  AppWrapper,
  MainContainer,
  ImgPrincipal,
  TextContainer,
  Title,
  Subtitle,
  FilterContainer,
  FilterTitle,
  FilterGroup,
  FilterInput,
  InputGroup,
} from "./dashboardStyle";

export const DashboardPage = () => {
  const { postsInfo } = useContext(ListPostsContext);

  const { carBrandsInfo, carDetails, getCarDetails } = useContext(
    ListCarsKenzieContext
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  useEffect(() => {
    if (selectedBrand) {
      const models = carDetails.map((car) => car.name);
      setSelectedModels(models);
    } else {
      const initialModels: string[] = [];
      Object.entries(carBrandsInfo).forEach(([_, models]) => {
        if (models.length > 0) {
          initialModels.push(models[0].name);
        }
      });
      setSelectedModels(initialModels);
    }
  }, [carBrandsInfo, carDetails, selectedBrand]);

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

  const handleBrandClick = (brand: string) => {
    setFilters((prevState) => ({ ...prevState, brand }));
    getCarDetails(brand);
  };

  const handleModelClick = (model: string) => {
    setFilters((prevState) => ({ ...prevState, model }));
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
      const colorMatch = !color || post.color === color;
      const yearMatch = !year || post.year === year;
      const minKmMatch = !minKm || parseInt(post.kilometers) >= parseInt(minKm);
      const maxKmMatch = !maxKm || parseInt(post.kilometers) <= parseInt(maxKm);
      const minPriceMatch =
        !minPrice || parseInt(post.price) >= parseInt(minPrice);
      const maxPriceMatch =
        !maxPrice || parseInt(post.price) <= parseInt(maxPrice);
      const fuelTypeMatch = !fuelType || post.fuelType === fuelType;

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

  const uniqueFuelTypes = Array.from(
    new Set(postsInfo.map((post) => post.fuelType))
  )
    .filter(Boolean)
    .map(
      (fuelType: string) => fuelType.charAt(0).toUpperCase() + fuelType.slice(1)
    );

  const uniqueColors = Array.from(
    new Set(
      postsInfo.map(
        (post) => post.color.charAt(0).toUpperCase() + post.color.slice(1)
      )
    )
  );

  const uniqueYears = Array.from(new Set(postsInfo.map((post) => post.year)));

  return (
    <AppWrapper>
      <Header />
      <MainContainer>
        <ImgPrincipal>
          <TextContainer>
            <Title>Motors Shop</Title>
            <Subtitle>
              A melhor plataforma de anúncios de carros do país
            </Subtitle>
          </TextContainer>
        </ImgPrincipal>
        <FilterContainer>
          <FilterTitle>Marca</FilterTitle>
          <FilterGroup>
            {Object.keys(carBrandsInfo).map((brand) => (
              <Button
                key={brand}
                typeStyle="filter"
                onClick={() => handleBrandClick(brand)}
              >
                {brand}
              </Button>
            ))}
          </FilterGroup>
          <FilterTitle>Modelo</FilterTitle>
          <FilterGroup>
            {selectedModels.map((model, index) => (
              <Button
                key={index}
                typeStyle="filter"
                onClick={() => handleModelClick(model)}
              >
                {model}
              </Button>
            ))}
          </FilterGroup>
          <FilterTitle>Cor</FilterTitle>
          <FilterGroup>
            {uniqueColors.map((color: string, index: number) => (
              <Button
                key={index}
                typeStyle="filter"
                onClick={() => handleColorClick(color)}
              >
                {color}
              </Button>
            ))}
          </FilterGroup>
          <FilterTitle>Ano</FilterTitle>
          <FilterGroup>
            {uniqueYears.map((year: string, index: number) => (
              <Button
                key={index}
                typeStyle="filter"
                onClick={() => handleYearClick(year)}
              >
                {year}
              </Button>
            ))}
          </FilterGroup>
          <FilterTitle>Combustível</FilterTitle>
          <FilterGroup>
            {uniqueFuelTypes.map((fuelType: string, index: number) => (
              <Button key={index} typeStyle="filter">
                {fuelType}
              </Button>
            ))}
          </FilterGroup>
          <FilterTitle>Km</FilterTitle>
          <InputGroup>
            <FilterInput
              type="text"
              placeholder="Mínima"
              value={filters.minKm}
              onChange={handleMinKmChange}
            />
            <FilterInput
              type="text"
              placeholder="Máxima"
              value={filters.maxKm}
              onChange={handleMaxKmChange}
            />
          </InputGroup>
          <FilterTitle>Preço</FilterTitle>
          <InputGroup>
            <FilterInput
              type="text"
              placeholder="Mínimo"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
            />
            <FilterInput
              type="text"
              placeholder="Máximo"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
            />
          </InputGroup>
        </FilterContainer>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div>Não há carros disponíveis com esses filtros</div>
        )}
      </MainContainer>
      <Footer />
    </AppWrapper>
  );
};
