import React from 'react'
import config from '../../../config/config'

export default function Logo() {
  return (
    <img
          src={config.PUBLIC_URL + "/assets/images/amdital/main_logo.svg"}
          alt=""
          className="mb-[24px] max-sm:mb-5"
        />
  )
}
