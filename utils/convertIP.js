const convertIPv6toIPv4 = ipv6 => {
  const ipv4 = ipv6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (ipv4) {
    return ipv4[1];
  }
  return ipv6;
};
export default convertIPv6toIPv4;
