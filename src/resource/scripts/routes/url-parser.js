function extractPathnameSegments(path) {
  const splitUrl = path.split('/');

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = '';

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat('/:id');
  }

  return pathname || '/';
}

export function getActivePathname() {
  // return location.hash.replace('#', '') || '/';
  const fullPath = location.hash.replace('#', '') || '/';
  const [path] = fullPath.split('?');
  return path;
}

export function getActiveRoute() {
  const pathname = getActivePathname();
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}

export function getQueryParams() {
  const fullPath = location.hash.replace('#', '') || '/';
  const [, queryString] = fullPath.split('?');
  if (!queryString) return {};

  return queryString
    .split('&')
    .map(param => param.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}