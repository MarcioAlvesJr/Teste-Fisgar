import { Description } from '@mui/icons-material';
import * as yup from 'yup';

yup.setLocale({
    mixed: {
      default: "é inválido",
      required: "campo obrigatório",
      oneOf: "deve ser um dos seguintes valores: ${values}",
      notOneOf: "não pode ser um dos seguintes valores: ${values}"
    },
    string: {
      length: "deve ter exatamente ${length} caracteres",
      min: "deve ter pelo menos ${min} caracteres",
      max: "deve ter no máximo ${max} caracteres",
      email: "tem o formato de e-mail inválido",
      url: "deve ter um formato de URL válida",
      trim: "não deve conter espaços no início ou no fim.",
      lowercase: "deve estar em maiúsculo",
      uppercase: "deve estar em minúsculo"
    },
    number: {
      min: "deve ser no mínimo ${min}",
      max: "deve ser no máximo ${max}",
      lessThan: "deve ser menor que ${less}",
      moreThan: "deve ser maior que ${more}",
      positive: "deve ser um número posítivo",
      negative: "deve ser um número negativo",
      integer: "deve ser um número inteiro"
    },
    date: {
      min: "deve ser maior que a data ${min}",
      max: "deve ser menor que a data ${max}"
    },
    array: {
      min: "deve ter no mínimo ${min} itens",
      max: "deve ter no máximo ${max} itens"
    }
});

const { string,object, array} = yup

export const cep ={
    regex:  /^[0-9]{5}-[0-9]{3}$/,
    error: "formato de CEP inválido"
}
export const cpf ={
    regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
    error: "formato de CPF inválido"
}

const descriptionToFields = (description)=>{
  try{
    const [streetNumber, neighborhoodCity, stateCountry] = description.split("-")
  
    const fields = {
      street: streetNumber.split(",")[0].trim(),
      number: streetNumber.split(",")[1].trim(),
      neighborhood: neighborhoodCity.split(",")[0].trim(),
      city: neighborhoodCity.split(",")[1].trim(),
      state: stateCountry.split(",")[0].trim(),
      country: stateCountry.split(",")[1].trim(),
      validFields: true
    }
    return fields
  }catch(e){
    return {validFields: false}
  }
}

const validationSchema = object({
    address: object().typeError("campo obrigatório"),
    adressType: string().when('address', (address, schema)=>{
      if(!address) return string().required()
      const fields = descriptionToFields(address.description)
      
      return fields.validFields ? string() : string().required(
        `selecione no formato "Rua, Numero - Bairro, Cidade - Estado, Pais"`
      )
    }),
    CEP: string().matches(cep.regex,cep.error).required(),
    name: string().required(),
    CPF: string().matches(cpf.regex,cpf.error).required(),
    email: string().email().required(),
    message: string().required(),
    cordenates: string().required(),
    bulletPoint: string().required()
})


export default validationSchema