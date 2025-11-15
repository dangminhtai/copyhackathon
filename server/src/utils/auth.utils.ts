/**
 * Generates a random 6-digit OTP (One-Time Password).
 * @returns A 6-digit numeric string.
 */
export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
