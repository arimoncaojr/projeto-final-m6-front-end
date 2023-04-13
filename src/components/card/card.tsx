import { CardStyle } from "./cardStyle"

const dbimg = [
     { url: "https://i0.wp.com/thegarage.com.br/wp-content/uploads/2018/12/1979-opala-ss-carro-antigo-branco-com-faixa-preta.jpg?resize=4063%2C2709&ssl=1" },
     { url: "https://i.servimg.com/u/f85/12/55/31/99/tm/dsc06710.jpg"},
     { url: "https://armazemdovovo.com.br/images/anuncios/54406-seq-2-11-classico-0752.jpg" },
     { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxAlUqUnqpY8Ly64pYi9jrMK8YpkRQHyFVQ&usqp=CAU"}
]

export const Card = () => {
     
     return (
          <CardStyle>
               <figure>
                    <img src={dbimg[0].url} alt="foto do carro"/>
               </figure>
          </CardStyle>
     )
}