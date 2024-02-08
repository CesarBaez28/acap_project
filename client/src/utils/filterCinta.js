import { SUPER_USER_BRANCH_OFFICE } from "../constants"

export function filterCinta (data, filter) {
  let filterData
  if (filter !== SUPER_USER_BRANCH_OFFICE) {
    filterData = data.filter((item) => item.location.location === filter)
    return filterData
  }
  return data
}