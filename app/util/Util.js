const People = require("../model/People");

module.exports = class Util {

    spanishData;

    static Cast(englishData) {

        this.spanishData = englishData;
        englishData=null;

        this.renameKey("count","cantidad");
        this.renameKey("previous","anterior");
        this.renameKey("next","siguiente");
        this.renameKey("results","resultado");

        this.spanishData.resultado.forEach((element,i) => {
            let one = new People();
            one.nombre = element.name
            one.altura = element.height;
            one.masa = element.mass;
            one.colorCabello = element.hair_color;
            one.colorPiel = element.skin_color;
            one.colorOjos = element.eye_color;
            one.añoNacimiento = element.birth_year;
            one.genero = element.gender;
            one.mundoNatal = element.homeworld;
            one.peliculas = element.films;
            one.especies = element.species;
            one.vehiculos = element.vehicles;
            one.navesEstelares = element.starsships;
            one.creado = element.created;
            one.editado = element.edited;
            one.url = element.url;

            this.spanishData.resultado[i] = one;
        });

        return this.spanishData;
    }

    static renameKey(oldkey, newKey) {
        this.spanishData[newKey] = this.spanishData[oldkey];
        delete this.spanishData[oldkey];
    }

}


