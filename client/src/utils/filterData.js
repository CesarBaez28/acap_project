export function filterDataById (data, setFunction, id) {
  setFunction(data.filter((item) => item.id !== id))
}