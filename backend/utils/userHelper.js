import bcrypt from 'bcrypt';

const encriptPassword = async (planePassword) => {
  const saltround = 10;
  const encriptedPassword = await bcrypt.hash(planePassword, saltround);
  return encriptedPassword;
};

const matchPassword = async (userpassword, encriptedPassword) => {
  return bcrypt.compare(userpassword, encriptedPassword); // Fix here
};

export { encriptPassword, matchPassword };
