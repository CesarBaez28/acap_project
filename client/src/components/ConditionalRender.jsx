import { LoadingIndicator } from "./LoadingIndicator";

export function ConditionalRender ({ isLoading, children }) {
  return isLoading ? <LoadingIndicator /> : children;
}