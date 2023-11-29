/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Importa nodemailer solo en este archivo
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uruguaycteen@gmail.com',
    pass: 'tzeqlstnnesomfoi', // Cambia esto por tu contraseña real o usa variables de entorno para mayor seguridad
  },
});

exports.sendPurchaseConfirmationEmail = onRequest(async (req, res) => {
  // Resto del código...
});

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
