export function verificationEmailTemplate(
    verificationUrl: string,
): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #F3F7F3;
        font-family: Arial, Helvetica, sans-serif;
    ">

        <table width="100%" cellpadding="0" cellspacing="0"
            style="background-color: #F3F7F3; padding: 40px 15px;">
            <tr>
                <td align="center">

                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="
                            max-width: 550px;
                            background-color: #FFFFFF;
                            border-radius: 12px;
                            overflow: hidden;
                        ">

                        <tr>
                            <td align="center"
                                style="background-color: #176B45; padding: 35px 20px;">

                                <h1 style="color: #FFFFFF; margin: 0; font-size: 32px;">
                                    Dalili
                                </h1>

                                <p style="color: #E4F3E9; margin: 10px 0 0; font-size: 13px;">
                                    Your learning journey starts here
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td align="center" style="padding: 40px 30px;">

                                <h2 style="color: #183D2D; font-size: 24px;">
                                    Welcome to Dalili!
                                </h2>

                                <p style="color: #52665A; font-size: 15px; line-height: 1.8;">
                                    We're happy to have you with us!
                                    Just one more step to activate your account.
                                </p>

                                <a href="${verificationUrl}"
                                    style="
                                        display: inline-block;
                                        background-color: #176B45;
                                        color: #FFFFFF;
                                        text-decoration: none;
                                        padding: 15px 35px;
                                        border-radius: 8px;
                                        font-size: 15px;
                                        font-weight: bold;
                                    ">
                                    Verify My Email
                                </a>

                                <p style="color: #809087; font-size: 12px; margin-top: 30px;">
                                    If the button doesn't work, copy this link:
                                </p>

                                <a href="${verificationUrl}"
                                    style="color: #176B45; font-size: 12px; word-break: break-all;">
                                    ${verificationUrl}
                                </a>

                            </td>
                        </tr>

                        <tr>
                            <td align="center"
                                style="background-color: #F8FAF8; padding: 22px;">

                                <p style="color: #718078; font-size: 12px;">
                                    If you didn't create this account,
                                    you can safely ignore this email.
                                </p>

                                <p style="color: #176B45; font-size: 12px;">
                                    © ${new Date().getFullYear()} Dalili
                                </p>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
}