import { useState } from "react"
import { CardStyle, IconUserStyle } from "./cardStyle"
import { MdKeyboardDoubleArrowRight as Next, MdKeyboardDoubleArrowLeft as Back } from "react-icons/md"
import { CgDollar as Money } from "react-icons/cg"
import { Button } from "../button/button"

const dbimg = [
     { url: "https://i0.wp.com/thegarage.com.br/wp-content/uploads/2018/12/1979-opala-ss-carro-antigo-branco-com-faixa-preta.jpg?resize=4063%2C2709&ssl=1" },
     { url: "https://i.servimg.com/u/f85/12/55/31/99/tm/dsc06710.jpg"},
     { url: "https://armazemdovovo.com.br/images/anuncios/54406-seq-2-11-classico-0752.jpg" },
     { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxAlUqUnqpY8Ly64pYi9jrMK8YpkRQHyFVQ&usqp=CAU"}
]

const images = [
     {
          "imageLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhdGCpMg5dLlGKc58kMMBWh46McwZzxA3LIA&usqp=CAU"
     }
]

export const Card = () => {
     const [indexImg, setIndexImg] = useState(0)
     const handleClickImg = (button: string) => {
          const sizeDbImg = dbimg.length - 1

          if (button === "next") {
               setIndexImg(indexImg + 1)
               if (sizeDbImg === indexImg) {
                    setIndexImg(0)
               }
          }

          if (button === "back") {
               setIndexImg(indexImg - 1)
               if (indexImg === 0) {
                    setIndexImg(sizeDbImg)
               }
          }
     }

     const boa = true
     const isActive = true
 
     return (
          <CardStyle isActive={isActive}>
               <figure>
                    <button onClick={() =>
                         handleClickImg("back")}
                         className="back"
                    >
                         <Back />
                    </button>
                    <img src={dbimg[indexImg].url} alt="foto do carro" />
                    <button onClick={() =>
                         handleClickImg("next")}
                         className="next"
                    >
                         <Next />
                    </button>
                    {boa && <Money className="isGoodPurchase"/>}
                    {isActive? <span>Ativo</span> : <span>Inativo</span>}
               </figure>
               <h2>Maserati - Ghibli</h2>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem dummy text of the printing and typesetting industry. Lorem</p>
               <IconUserStyle>
                    <p className="iconUser">SL</p>
                    <p className="nameUser">Samuel Leao</p>
               </IconUserStyle>
               <div className="containerDetail">
                    <Button typeStyle="detail">100.250 KM</Button>
                    <Button typeStyle="detail">2019</Button>
                    <p>R$ 00.000,00</p>
               </div>
          </CardStyle>
     )
}