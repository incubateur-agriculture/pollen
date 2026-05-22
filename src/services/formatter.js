const formatMontant = (value) => value > 0 ? new Intl.NumberFormat('fr-FR').format(value) : '-'

export { formatMontant }