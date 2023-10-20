import nodemailer from 'nodemailer';

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const email = req.body.email;

  if (!email) {
    console.log(req.body.email)
    return res.status(400).send({ error: 'Email is required.' });
  }

  const otp = generateOTP();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'uruguaycteen@gmail.com',
      pass: 'uruguaycteen123.'
    }
  });

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_GMAIL_USER,
    to: email,
    subject: 'Código único de recuperación',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333; text-align: center; border-bottom: 2px solid #ddd; padding-bottom: 10px;">Recuperación de Contraseña</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #666;">Estás recibiendo este correo porque has solicitado recuperar tu contraseña en nuestra plataforma. A continuación, encontrarás el código único para realizarlo:</p>
      <p style="font-size: 30px; font-weight: bold; text-align: center; margin: 20px 0; color: #444;">${ otp }</p>
      <p style="font-size: 14px; line-height: 1.5; color: #777;"><i>Recuerda que este código solo tiene validez por 10 minutos. Pasado ese lapso de tiempo, deberás generar uno nuevo realizando el proceso nuevamente.</i></p>
    </div>
  `
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.send({ status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Failed to send the email.' });
  }
}

function generateOTP () {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
