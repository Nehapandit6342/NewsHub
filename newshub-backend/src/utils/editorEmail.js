import { transporter } from "../config/mailer.js";

export const sendEditorWelcomeEmail = async (email, password) => {
  await transporter.sendMail({
    from: `"NewsHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "[NewsHub] Your Editor Account is Ready",
    html: `
      <div style="font-family: Arial;">
        <h2>Welcome to Admin Panel</h2>

        <p>You have been assigned as an <b>Editor</b>.</p>

        <p><b>Login Credentials:</b></p>
        <p>Email: ${email}</p>
        <p>Password: ${password}</p>

        <p style="color:red;">
          Please change your password after first login.
        </p>

        <p>Login now and start working 🚀</p>
      </div>
    `,
  });
};
