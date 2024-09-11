import bcrypt from "bcryptjs";

export const hashpassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt)

    return hashedpassword;
};