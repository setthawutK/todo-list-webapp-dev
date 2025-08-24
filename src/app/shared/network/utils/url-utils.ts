const PARAMS_SYMBOL = '$';

export function withParams(url: string, ...params: any[]): string {
  for (let i = 0; i < params.length; i++) {
    const paramValue = params[i];

    const paramPosition = `${PARAMS_SYMBOL}${i + 1}`;

    url = url.replace(paramPosition, paramValue);
  }

  return url;
}
