import {FrequencePaiement} from "./FrequencePaiement";
import {CategorieMarchand} from "./CategorieMarchand";
import {Zone} from "./Zone";

export class Marchand {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public telephone?: string,
        public code?: string,
        public zone?: Zone,
        public frequencePaiement?: FrequencePaiement,
        public categorieMarchand?: CategorieMarchand
    ) { }

}
