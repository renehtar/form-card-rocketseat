import { z } from 'zod'

export default z.object({
  ccNumber: z.string()
    .nonempty('O número é obrigatório.')
    .refine(word => word
      .split(' ')
      .filter(num => !num.includes('*'))
      .join('').length === 16
    , 'complete o número do cartão.'),

  ccHolder: z.string()
    .min(10, 'Complete como está no cartão.')
    .transform(name => name
      .trim()
      .split(' ')
      .map(word => word[0].toUpperCase().concat(word.substring(1)))
      .join(' ')),

  ccValidity: z.string()
    .min(4, 'Preencha como está no cartão.')
    .refine(date => date
      .split('/')
      .filter(num => !num.includes('_'))
      .join('').length === 4
    , 'Coloque a validade como está no cartão.'),
    
  ccCvv: z.string()
    .nonempty('O CVV é obrigatório.')
    .refine(word => word
      .split(' ')
      .filter(num => !num.includes('*'))
      .join('').length === 3
    , 'complete o número do cartão.')
})