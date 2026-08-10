import dotenv from 'dotenv';
dotenv.config();

/**
 * Send Automated WhatsApp Token directly to Customer's Phone from Express Backend
 */
export async function sendAutomatedWhatsAppOrderToken(order) {
  try {
    if (!order || !order.customer) {
      return { success: false, reason: 'No customer details' };
    }

    const rawPhone = order.customer.phone ? order.customer.phone.replace(/\D/g, '') : '';
    if (!rawPhone) {
      return { success: false, reason: 'No phone number provided' };
    }

    const phoneNum = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const itemsList = order.items
      ? order.items.map((i) => `• ${i.name} × ${i.qty} (₹${(i.price * i.qty).toFixed(0)})`).join('\n')
      : '';

    const message = 
`🍨 *Scoop & Co. — Lulu Mall Counter Pickup* 🍨
------------------------------------------
🎟️ *PICKUP TOKEN:* ${order.tokenNo || 'TK-42'}
🧾 *Order Number:* ${order.orderNo}
👤 *Customer:* ${order.customer.name || 'Valued Customer'}
💰 *Total Paid:* ₹${order.total ? order.total.toFixed(2) : '0.00'} (${(order.payment || 'UPI').toUpperCase()})
------------------------------------------
📦 *Items:*
${itemsList}
------------------------------------------
📍 *Pickup Location:* Counter #3, Lulu Mall Food Court
Please show this token at Counter #3 to collect your order. Thank you!`;

    const gatewayUrl = process.env.WHATSAPP_API_URL;
    const token = process.env.WHATSAPP_TOKEN;

    if (gatewayUrl && token) {
      // Call Live External WhatsApp Gateway (e.g. UltraMsg / Twilio / CallMeBot)
      const res = await fetch(gatewayUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          to: `+${phoneNum}`,
          body: message,
        }),
      });
      const data = await res.json();
      console.log(`✅ [LIVE WHATSAPP API] Sent token ${order.tokenNo} to +${phoneNum}:`, data);
      return { success: true, mode: 'LIVE_API', details: data };
    } else {
      // Simulated Zero-Downtime Sandbox Mode
      console.log(`\n==================================================`);
      console.log(`📱 [AUTOMATED DIRECT BACKEND WHATSAPP NOTIFICATION]`);
      console.log(`Recipient: +${phoneNum}`);
      console.log(`Token: ${order.tokenNo}`);
      console.log(`Message Body:\n${message}`);
      console.log(`==================================================\n`);
      return { success: true, mode: 'AUTOMATED_BACKEND_SIMULATED', recipient: `+${phoneNum}` };
    }
  } catch (err) {
    console.error('❌ Error sending direct backend WhatsApp notification:', err.message);
    return { success: false, error: err.message };
  }
}
