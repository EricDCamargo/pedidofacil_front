import React from 'react'
import styles from './dropdown.module.css'

interface OptionsType {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  width?: string
  defaultValue: string
  onChange: (event: any) => void
  options: Array<OptionsType>
  name: string
  disabled?: boolean
}

const Dropdown = ({
  label,
  width,
  onChange,
  defaultValue,
  name,
  options,
  disabled
}: SelectProps) => {
  return (
    <div className={styles.dropDownContainer} style={{ width }}>
      {label && <label>{label}</label>}
      <select
        className={styles.dropDown}
        onChange={onChange}
        name={name}
        value={defaultValue}
        disabled={disabled}
      >
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Dropdown
