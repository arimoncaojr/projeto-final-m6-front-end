import { Button } from "../../components/button/button"
import { Card } from "../../components/card/card"
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import { Wrapper } from "../../styles/wrapper"
import { BannerStyle, Filter, MainContainer } from "./homepageStyle"
import { MdKeyboardDoubleArrowRight as Next, MdKeyboardDoubleArrowLeft as Back } from "react-icons/md"
import { useContext, useEffect, useState } from "react"
import { ListCarsKenzieContext } from "../../contexts/ListCarsKenzieContext"
import { IPosts, ListPostsContext } from "../../contexts/ListPostsContext"
import { InputStyle } from "../../components/input/inputStyle"




export const HomePage = () => {
     const [filterClickMobile, setFilterClickMobile] = useState(false)
     const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
     const [selectedModels, setSelectedModels] = useState<string[]>([]);
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
     
     const { postsInfo } = useContext(ListPostsContext);
     const { carBrandsInfo, carDetails, getCarDetails } = useContext(
          ListCarsKenzieContext
     );

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
  // console.log(filteredPosts.length);

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
     
     const hasActiveFilters = () => {
          return Object.values(filters).some((filterValue) => filterValue !== "");
        };
      
        useEffect(() => {
          setShowClearFiltersButton(hasActiveFilters());
        }, [filters]);
      
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
        };
      
        const handleBrandClick = (brand: string) => {
          setSelectedBrand(brand);
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
        console.log(filteredPosts.length);
      
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
      
        const uniqueColors = Array.from(
          new Set(postsInfo.map((post) => post.color))
     ).map((color: string) => capitalizeFirstLetter(color));
     
     const HandleFilterMobileClick = () => {
          setFilterClickMobile(!filterClickMobile)
     }
     
     return (
          <Wrapper>
               <Header/>
               <BannerStyle>
                    <h1>Motors Shop</h1>
                    <p>A melhor plataforma de anúncios de carros do país!</p>
               </BannerStyle>
               <MainContainer className="container" length={filteredPosts.length}>
                    <section className="wrapperContainer">
                         <div className="cardsContainer">
                         {filteredPosts.length > 0 ? (
                              filteredPosts.map((post) => <Card key={post.id} post={post} type="home"/>)
                         ) : (
                              <p className="messageNotFoundCar">Não há carros disponíveis</p>
                         )}
                         </div>
                         <div className="filterContainer">
                              <Button typeStyle="colorBrand1" onClick={HandleFilterMobileClick}>Filtros</Button>
                              <Filter filterClickMobile={filterClickMobile}>
                                   <div className="containerClickFilterModal">
                                        <p>Filtro</p>
                                        <button onClick={HandleFilterMobileClick}>X</button>
                                   </div>
                                   <h2>Marca</h2>
                                   <div>
                                        {Object.keys(carBrandsInfo).map((brand) => (
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
                                        {selectedModels.map((model, index) => (
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
                                        {uniqueColors.map((color: string, index: number) => (
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
                                        {uniqueYears.map((year: string, index: number) => (
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
                                        {uniqueFuelTypes.map((fuelType: string, index: number) => (
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
                                   <Button typeStyle="colorBrand1" onClick={HandleFilterMobileClick}>
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
                         <p> 1 <span>de 2 </span></p>
                         <button>Seguinte <Next/> </button>
                    </div>
               </MainContainer>
               <Footer/>
          </Wrapper>
     )
}