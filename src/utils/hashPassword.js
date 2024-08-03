import bcryptjs from "bcryptjs";
export const hassPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

export const comparePassword = (password, hassPassword) => {
  return bcryptjs.compareSync(hassPassword, password);
};
