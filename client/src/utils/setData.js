export function setData(data, newData, setFunction) {
  setFunction(
    data.map((item) => (
      item.id === newData.id
        ? { ...newData } : item
    ))
  )
}