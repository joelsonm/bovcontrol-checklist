import * as Yup from 'yup'
import { pt } from 'yup-locale-pt'

const Validator = Yup

Validator.setLocale(pt)

export default Validator
