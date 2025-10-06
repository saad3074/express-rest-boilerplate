/* eslint-disable camelcase */
const axios = require('axios');
const sgMail = require('@sendgrid/mail');
const randomstring = require('randomstring');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.facebook = async (access_token) => {
  const fields = 'id, name, email, picture';
  const url = 'https://graph.facebook.com/me';
  const params = { access_token, fields };
  const response = await axios.get(url, { params });
  const {
    id, name, email, picture,
  } = response.data;
  return {
    service: 'facebook',
    picture: picture.data.url,
    id,
    name,
    email,
  };
};

exports.randomStr = () => randomstring.generate(10);

exports.send_email = async (to, subject, html) => {
  const msg = {
    to,
    from: 'Alcamy <support@alcamy.com>',
    subject,
    html,
  };
  sgMail.send(msg, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
