import nodemailer from 'nodemailer';

/**
 * Generates a random 6-digit OTP (One-Time Password).
 * @returns A 6-digit numeric string.
 */
export const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// --- Cấu hình Nodemailer ---
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Khởi tạo transporter chỉ khi có thông tin cấu hình
const transporter =
    emailUser && emailPass
        ? nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        })
        : null;

/**
 * Sends a password reset OTP email to a user.
 * @param to The recipient's email address.
 * @param otp The 6-digit one-time password.
 */
export const sendPasswordResetEmail = async (to: string, otp: string): Promise<void> => {
    // Nếu transporter không được cấu hình, ném ra lỗi để báo cho người dùng biết chức năng không khả dụng.
    if (!transporter) {
        console.warn(`
            ================================================================================
            CẢNH BÁO: DỊCH VỤ EMAIL CHƯA ĐƯỢC CẤU HÌNH.
            Chức năng quên mật khẩu sẽ không hoạt động.
            Để gỡ lỗi, mã OTP cho ${to} là: ${otp}
            Trong môi trường production, hãy cấu hình EMAIL_USER và EMAIL_PASS trong file .env.
            ================================================================================
        `);
        throw new Error('Dịch vụ email chưa được cấu hình. Chức năng này hiện không khả dụng.');
    }

    const mailOptions = {
        from: `"Đại học Thông minh" <${emailUser}>`,
        to: to,
        subject: 'Yêu cầu đặt lại mật khẩu | Đại học Thông minh',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #4A5568; text-align: center;">Yêu cầu đặt lại mật khẩu</h2>
                <p>Chào bạn,</p>
                <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại ứng dụng Đại học Thông minh.</p>
                <p>Mã xác thực của bạn là:</p>
                <p style="font-size: 28px; font-weight: bold; letter-spacing: 3px; color: #4299E1; margin: 25px 0; text-align: center; background-color: #f0f4f8; padding: 10px; border-radius: 5px;">${otp}</p>
                <p>Mã này sẽ hết hạn sau <strong>10 phút</strong>.</p>
                <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Tài khoản của bạn vẫn an toàn.</p>
                <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 25px 0;" />
                <p style="font-size: 12px; color: #718096; text-align: center;">Trân trọng,<br/>Đội ngũ Đại học Thông minh</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email đặt lại mật khẩu đã được gửi tới: ${to}`);
    } catch (error) {
        console.error(`Lỗi khi gửi email tới ${to}:`, error);
        throw new Error('Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.');
    }
};
