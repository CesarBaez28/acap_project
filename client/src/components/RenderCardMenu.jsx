import { CardMenu } from "./CardMenu";

export function RenderCardMenu (title, hasPermission, options ) {
  const availableOptions = options.filter(option => hasPermission(option.privilege));

  if (availableOptions.length > 0) {
    return (
      <CardMenu
        title={title}
        options={availableOptions}
      />
    );
  }

  return null;
}