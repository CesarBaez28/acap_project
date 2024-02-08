import { lazy } from "react"
 
export function lazyLoad (path, nameExport) {
  return lazy(() => {
    const promise = import(path)
    if( nameExport === null) { return promise }
    return promise.then(module => ({default: module[nameExport]}))
  })
}