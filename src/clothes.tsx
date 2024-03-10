class Clothes {
    top: string
    bottom: string
    outerwear: string
    shoes: string
   
    constructor(top: string, bottom: string, outerwear: string, shoes: string) {
      this.top = top
      this.bottom = bottom
      this.outerwear = outerwear
      this.shoes = shoes
    }
   
    setClothes(temp : number) {
        if (temp > 70) {
            return new Clothes("short sleeves", "shorts", "none", "sandals/sneakers");
        }
        else if (temp <= 70 && temp > 40) {
            return new Clothes("long sleeves", "leggings", "light jacket", "sneakers");
        }
        else {
            return new Clothes("sweater", "jeans", "heavy jacket", "boots");
        }
    }
  }

  export { Clothes }