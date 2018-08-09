
export default (o) => {
  if (o === null) {
    return null;
  }
  o._id = o._id.toString()
  return o
}
