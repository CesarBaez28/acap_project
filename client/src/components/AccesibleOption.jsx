export function AccessibleOption({permissions, privilegesId, Option }) {

  const isAccessible = permissions && permissions.some(({ privileges }) => privileges.id === privilegesId);

  return isAccessible ? Option : null;
}