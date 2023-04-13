import S from './App.module.css'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputMask from 'react-input-mask'
import createUserCardSchema from './schemas/UserCardSchema'
import Modal from './components/modal/Modal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [cvvIsFocus, setCvvIsFocus] = useState(false)
  const [creditCardData, setCreditCardData] = useState({
    ccNumber: '**** **** **** ****',
    ccHolder: 'seu nome aqui',
    ccValidity: 'mm/aa',
    ccCvv: '***',
  })
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createUserCardSchema)
  })

  const createUser = (data) => {
    setModalOpen(true)
    console.log(data)
  }

  return (
    <div className={S.App}>
      <div className={S.formContainer}>
        <form onSubmit={handleSubmit(createUser)}>
          <div className={S.inputWrapper}>
            <label htmlFor='ccNumber'>Número do cartão</label>
            <InputMask
              name='ccNumber'
              id='ccNumber'
              maskChar='*'
              mask='9999 9999 9999 9999'
              placeholder='**** **** **** ****'
              value={creditCardData.ccNumber}
              {...register('ccNumber')}
              onInput={({target})=> setCreditCardData({...creditCardData, ccNumber: target.value.slice(0, -1)})}
            />
            {errors.ccNumber && <p className={S.warning}>{errors.ccNumber.message}</p>}
          </div>
          <div className={S.inputWrapper}>
            <label htmlFor='ccHolder'>Nome do títular</label>
            <input
              name='ccHolder'
              id='ccHolder'
              placeholder='Nome como está no cartão'
              maxLength={30}
              {...register('ccHolder')}
              onInput={({target})=> setCreditCardData({...creditCardData, ccHolder: target.value})}
              />
            {errors.ccHolder && <p className={S.warning}>{errors.ccHolder.message}</p>}
          </div>
          <div className={S.inputWrapperContainer}>
            <div className={S.inputWrapper}>
              <label htmlFor='ccValidity'>Validade</label>
              <InputMask
                name='ccValidity'
                id='ccValidity'
                mask='99/99'
                placeholder='mm/aa'
                {...register('ccValidity')}
                onInput={({target})=> setCreditCardData({...creditCardData, ccValidity: target.value.slice(0, -1)})}
              />
              {errors.ccValidity && <p className={S.warning}>{errors.ccValidity.message}</p>}
            </div>
            <div className={S.inputWrapper}>
              <div className={S.cvvInfoContainer}>
                <label htmlFor='ccCvv'>CVV</label>
                  <img src='src/assets/interrog.svg' alt='question mark icon to inform about what is credit card cvv' tabIndex={0}/>
                  <div className={S.cvvInfoModal}>
                  <p>O CVV "Card Verification Value" é um código de segurança de 3 dígitos que aparece no verso do seu cartão.</p>
                  </div>
              </div>
              <InputMask 
                name='ccCvv'
                id='ccCvv'
                maskChar='*'
                mask='999'
                placeholder='***'
                {...register('ccCvv')}
                onInput={({target})=> setCreditCardData({...creditCardData, ccCvv: target.value.slice(0, -1)})}
                onFocus={()=>setCvvIsFocus(true)}
                onBlur={()=>setCvvIsFocus(false)}
              />
              {errors.ccCvv && <p className={S.warning}>{errors.ccCvv.message}</p>}
            </div>
          </div>

          <p className={S.security}>
            <img src='src/assets/security.svg' alt='icon security' />
            seus dados estão seguros.
          </p>

          <button className={S.buttonSubmit} type='submit'>enviar</button>
        </form>

        {/* imagem do cartão e textos */}
        <div className={S.creditCard} onClick={()=>setCvvIsFocus(!cvvIsFocus)}>
          <div className={`${S.front} ${cvvIsFocus && S.cvvActive}`}>
            <span className={S.ccNumber}>{creditCardData.ccNumber}</span>
            <span className={S.ccHolder}>{creditCardData.ccHolder}</span>
            <span className={S.ccValidity}>{creditCardData.ccValidity}</span>
          </div>
          <div className={`${S.back} ${cvvIsFocus && S.cvvActive}`}>
            <span className={S.ccCvv}>{creditCardData.ccCvv}</span>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen}>
        <p className={S.warningModalText}>enviado com sucesso!</p>
        <button className={S.buttonModal} onClick={()=> setModalOpen(false)}>fechar</button>
      </Modal>
    </div>
  )
}