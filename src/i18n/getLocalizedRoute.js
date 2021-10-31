const getLocalizedRoute = (originalRoute, locale) => {
  let routes;

  try {
    routes = require(`../../locales/${locale}/routes.json`);
  } catch {
    console.log(
      `Error: routes.json transalation file missing in locales/${locale} for locale: ${locale}`
    );
    routes = require(`../../locales/en/routes.json`);
  }

  const localizedRoute = routes[originalRoute];

  if (!localizedRoute) {
    /* --- Uncomment the console.log to debug for missing Routes --- */
    // console.log(
    //   `Routetranslation Missing!.\n There is no transalation for ${originalRoute} in src/i18n/route/route.js ${locale}.`
    // );
    return originalRoute;
  }
  return localizedRoute;
};

module.exports = getLocalizedRoute;
