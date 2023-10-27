import nodemailer from 'nodemailer'

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const email = req.body.email;
  const products = req.body.products
  const totalCost = req.body.totalCost
  const userPointsLeft = req.body.userPointsLeft

  if (!email) {
    console.log(req.body.email)
    return res.status(400).send({ error: 'Email is required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'uruguaycteen@gmail.com',
      pass: 'tzeqlstnnesomfoi'
    }
  });

  const renderProductList = (products) => {
    return products.map(product => `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-direction: column">
      <div style="flex-grow: 1;">
        <strong style="font-size: 16px; color: #444;">${ product.title }</strong> <br>
        <div style="font-size: 14px; color: #666;">Cantidad: ${ product.quantity }</div>
      </div>
    </div>
  `).join('');
  };

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_GMAIL_USER,
    to: email,
    subject: '¡Compra exitosa!',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9e9e9; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333; text-align: center; border-bottom: 2px solid #ddd; padding-bottom: 10px; font-size: 30px">Cteen Store</h1>
      <p style="font-size: 22px; line-height: 1.5; color: #666;">¡Compra exitosa!</p>
      <p style="font-size: 16px; line-height: 1.5; color: #666;">Has realizado satisfactoriamente la compra de los siguientes productos:</p>
      <div style="margin: 20px auto; width: 100%;">
        ${renderProductList(products)}
      </div>
      <div style="margin: 16px 0">
        <div style="font-size: 16px; font-weight: 500">Gastaste: ${totalCost} en tu última compra</div>
        <div style="font-size: 13px; font-weight: 400; color: #777">(Recordá que aún tenés ${userPointsLeft} restantes)</div>
      </div>
      <p style="font-size: 14px; line-height: 1.5; color: #777;"><i>Para retirarlos, contactate con la organización o envía un mail a cteen@example.com, con el código de tu compra y nos comunicaremos para coordinar la entrega</i></p>
      <p style="margin-top: 30px; text-align: center; color: #222; font-weight: 700; text-align: center; font-size: 24px">¡Muchas gracias!</p>
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
