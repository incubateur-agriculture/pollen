const formatMontant = (value) => {
  const isNull = value === null || value === undefined || value === false
  return isNull ? '-' : new Intl.NumberFormat('fr-FR').format(value)
}

export { formatMontant }