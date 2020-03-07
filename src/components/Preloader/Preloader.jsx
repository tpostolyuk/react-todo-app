import React from 'react'
import s from './Preloader.module.scss';
import classname from 'classnames';

export const Preloader = ({className}) => {
  return (
    <div>
    <svg className={classname(s.canvas, className)} viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
      <symbol id="s__circle">
        <circle r="10" cx="20" cy="20"/>
      </symbol>
      
      <g className={`${s.g_circles} ${s.g_circles__v1}`}>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>  
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
        <g className={s.g__circle}>
          <use href="#s__circle" className={s.u__circle}/>
        </g>
      </g>
  </svg>
  </div>
  )
}

