export function getNestedError(errorObject: Error): string {
  if (!(errorObject instanceof Error)) {
    return 'Unknown error';
  }

  // Check first for a cause
  const cause = errorObject.cause as Record<string, any> | undefined;
  if (cause) {
    const body = cause['body'] as Record<string, any> | undefined;
    if (body) {
      if ('error' in body) {
        return body['error'];
      }
    }
  }

  // Otherwise check for a message
  if ('message' in errorObject) {
    return `${errorObject.message}`;
  }
  return 'Unknown error';
}