import { Api } from "../services/apiKenzieKars";
import React, { useState, createContext, useEffect } from "react";

interface IListCarsKenzieContextProps {
  children: React.ReactNode;
}

interface ICarModel {
  name: string;
}

interface ICarBrand {
  [brand: string]: ICarModel[];
}

interface IModelCar {
  id: string;
  name: string;
  brand: string;
  year: string;
  fuel: number;
  value: number;
}

interface IListCarsKenzieContext {
  carBrandsInfo: ICarBrand | {};
  carDetails: IModelCar[] | [];
  setCarBrandsInfo: React.Dispatch<React.SetStateAction<ICarBrand>>;
  getCarDetails: (brand: string) => void;
}

export const ListCarsKenzieContext = createContext<IListCarsKenzieContext>(
  {} as IListCarsKenzieContext
);

export const ListCarsKenzieProvider = ({
  children,
}: IListCarsKenzieContextProps) => {
  const [carBrandsInfo, setCarBrandsInfo] = useState<ICarBrand>({});
  const [carDetails, setCarDetails] = useState<IModelCar[]>([]);

  useEffect(() => {
    Api.get<ICarBrand>("/cars")
      .then((res) => {
        setCarBrandsInfo(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const getCarDetails = (brand: string) => {
    Api.get<IModelCar[]>(`/cars?brand=${brand}`)
      .then((res) => {
        setCarDetails(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <ListCarsKenzieContext.Provider
      value={{ carBrandsInfo, setCarBrandsInfo, carDetails, getCarDetails }}
    >
      {children}
    </ListCarsKenzieContext.Provider>
  );
};
