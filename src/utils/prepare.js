export default (o) => {
  if (o === null) {
    return null;
  }

  // eslint-disable-next-line no-underscore-dangle
  o._id = o._id.toString();
  return o;
};
