import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.EMAIL_FROM || "NMLS Prep <noreply@nmlsprep.com>";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function sendSetupEmail(
  email: string,
  token: string
): Promise<void> {
  const setupUrl = `${BASE_URL}/setup-password?token=${token}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Set up your NMLS Prep account",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#06080f;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#06080f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1117;border:1px solid #1e2433;border-radius:12px;overflow:hidden;max-width:100%;">
          <tr>
            <td style="background:#06080f;padding:28px 40px;border-bottom:2px solid #c9a84c;">
              <h1 style="margin:0;color:#c9a84c;font-size:22px;font-weight:700;letter-spacing:0.08em;">NMLS PREP</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h2 style="color:#ffffff;font-size:22px;margin:0 0 14px;font-weight:700;">Your account is ready.</h2>
              <p style="color:#94a3b8;font-size:16px;line-height:1.7;margin:0 0 10px;">
                Thank you for your purchase. Click the button below to create your password and unlock your full study library.
              </p>
              <p style="color:#64748b;font-size:14px;margin:0 0 32px;">
                This link expires in <strong style="color:#ffffff;">24 hours</strong>.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#c9a84c;border-radius:10px;">
                    <a href="${setupUrl}" style="display:block;padding:16px 36px;color:#06080f;font-weight:700;font-size:16px;text-decoration:none;border-radius:10px;">
                      Set Up My Account &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#475569;font-size:13px;margin:32px 0 0;line-height:1.6;">
                Or paste this link in your browser:<br>
                <span style="color:#94a3b8;word-break:break-all;font-size:12px;">${setupUrl}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1e2433;">
              <p style="margin:0;color:#475569;font-size:13px;">
                If you didn't make this purchase, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });
}
