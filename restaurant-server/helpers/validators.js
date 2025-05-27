export const isValidDateFormat = date => {
  const regex = /^\d{2}-\d{2}-\d{4}$/
  if (!regex.test(date)) return false

  const [day, month, year] = date.split('-').map(Number)
  const parsedDate = new Date(year, month - 1, day)

  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  )
}
export const isValidTime = value => {
  const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
  if (!timeRegex.test(value)) return false

  const [hour, minute] = value.split(':').map(Number)
  if (hour < 13 || hour > 22) return false
  if (hour === 22 && minute > 0) return false

  return true
}
export const isValidPeopleCount = value => value >= 1 && value <= 8
