const layouts = (path) => () => import(`@/layouts/${path}`);
const pages = (path) => () => import(`@/views/${path}`);
//const images = (path) => () => require(`@/assets/images/${path}`);

export { layouts, pages };
