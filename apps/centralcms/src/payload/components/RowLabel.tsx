'use client'
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

interface RowData extends Record<string, any> {
  title?: string
}

interface Data {
  title?: string
  message?: string
  partner?: string
  [key: string]: unknown
}

const getLabelData = (path: string, data: Data): { label; data } => {
  if (path.includes('Headers')) return { label: 'Header', data: data?.title }
  if (path.includes('message')) return { label: 'Message', data: data?.message }
  if (path.includes('partners')) return { label: 'Partner', data: data?.partner }
  return { label: 'Item', data: null }
}

export const RowLabel = () => {
  const { data, rowNumber, path } = useRowLabel<RowData>()
  const { label, data: message } = getLabelData(path, data)

  return <label>{message ?? `${label} ${String(rowNumber).padStart(2, '0')}`}</label>
}

export default RowLabel
