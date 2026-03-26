const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

const formatAmount = (amount) => Number(amount || 0).toFixed(2)

const formatOrderDate = (date) => {
  const parsedDate = new Date(Number(date) || date)
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Recently'
  }

  return parsedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (date) => {
  const parsedDate = new Date(Number(date) || date)
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Recently'
  }

  return parsedDate.toLocaleString('en-US')
}

const getAddressBlock = (address = {}) => {
  return `${escapeHtml(address.fullName || 'Customer')}<br>
          ${escapeHtml(address.area || '')}<br>
          ${escapeHtml(address.city || '')}, ${escapeHtml(address.state || '')} - ${escapeHtml(address.pincode || '')}<br>
          Phone: ${escapeHtml(address.phoneNumber || 'N/A')}`
}

export const buyerEmailHtml = ({ name, items = [], amount, address, date }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f5f0e6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fcf8f1; border: 1px solid rgba(12,13,16,0.12); border-radius: 14px; overflow: hidden; }
    .header { background: #0c0d10; padding: 32px; text-align: center; }
    .logo { color: white; font-size: 24px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; }
    .tag { color: #ff533d; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; display: block; margin-top: 4px; }
    .body { padding: 36px; }
    .title { font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #0c0d10; margin-bottom: 8px; }
    .subtitle { color: #62687a; font-size: 13px; margin-bottom: 28px; }
    .badge { display: inline-block; background: #ffd8d1; color: #d23823; border: 1px solid rgba(210,56,35,0.22); padding: 4px 12px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
    .items-table { width: 100%; border-collapse: collapse; margin: 24px 0; }
    .items-table th { background: #0c0d10; color: white; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; padding: 10px 14px; text-align: left; }
    .items-table td { padding: 12px 14px; border-bottom: 1px solid rgba(12,13,16,0.08); font-size: 13px; color: #2f3340; }
    .total-row td { font-weight: 700; color: #0c0d10; border-top: 2px solid #ff533d; border-bottom: none; font-size: 15px; }
    .address-box { background: #ece6da; border-radius: 10px; padding: 18px; margin: 20px 0; }
    .address-label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #62687a; margin-bottom: 8px; }
    .address-text { font-size: 13px; color: #2f3340; line-height: 1.7; }
    .footer { background: #0c0d10; padding: 24px; text-align: center; }
    .footer-text { color: rgba(255,255,255,0.3); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Shounen Trendz</div>
      <span class="tag">streetwear with anime energy</span>
    </div>
    <div class="body">
      <div class="badge">Order Confirmed</div>
      <div class="title">Your Drop is Locked In, ${escapeHtml((name || 'Customer').split(' ')[0])}!</div>
      <div class="subtitle">Order placed on ${formatOrderDate(date)}</div>

      <table class="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td>${escapeHtml(item.product?.name || 'Product')}</td>
              <td>${item.quantity}</td>
              <td>$${formatAmount((item.product?.offerPrice || 0) * item.quantity)}</td>
            </tr>
          `).join('')}
          <tr class="total-row">
            <td colspan="2">Total (incl. 2% tax)</td>
            <td>$${formatAmount(amount)}</td>
          </tr>
        </tbody>
      </table>

      <div class="address-box">
        <div class="address-label">Shipping To</div>
        <div class="address-text">
          ${getAddressBlock(address)}
        </div>
      </div>

      <p style="color:#62687a;font-size:13px;line-height:1.7;">
        Payment method: <strong>Cash on Delivery</strong><br>
        We will notify you once your order ships.
      </p>
    </div>
    <div class="footer">
      <div class="footer-text">Shounen Trendz · All Rights Reserved</div>
    </div>
  </div>
</body>
</html>
`

export const sellerEmailHtml = ({ items = [], amount, address, date, orderId }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #f5f0e6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fcf8f1; border: 1px solid rgba(12,13,16,0.12); border-radius: 14px; overflow: hidden; }
    .header { background: #0c0d10; padding: 32px; }
    .logo { color: white; font-size: 24px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; }
    .alert { display: inline-block; background: #ff533d; color: white; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; padding: 5px 14px; border-radius: 999px; margin-top: 10px; }
    .body { padding: 36px; }
    .title { font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #0c0d10; margin-bottom: 6px; }
    .subtitle { color: #62687a; font-size: 13px; margin-bottom: 24px; }
    .stat-row { display: flex; gap: 16px; margin: 20px 0; }
    .stat { flex: 1; background: #ece6da; border-radius: 10px; padding: 14px; text-align: center; }
    .stat-val { font-size: 22px; font-weight: 900; color: #ff533d; }
    .stat-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #62687a; margin-top: 2px; }
    .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .items-table th { background: #0c0d10; color: white; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; padding: 10px 14px; text-align: left; }
    .items-table td { padding: 12px 14px; border-bottom: 1px solid rgba(12,13,16,0.08); font-size: 13px; color: #2f3340; }
    .address-box { background: #ece6da; border-radius: 10px; padding: 18px; margin: 20px 0; }
    .address-label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #62687a; margin-bottom: 8px; }
    .address-text { font-size: 13px; color: #2f3340; line-height: 1.7; }
    .footer { background: #0c0d10; padding: 20px; text-align: center; }
    .footer-text { color: rgba(255,255,255,0.3); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Shounen Trendz</div>
      <div class="alert">New Order Received</div>
    </div>
    <div class="body">
      <div class="title">New Order Alert!</div>
      <div class="subtitle">Order #${escapeHtml(orderId || 'N/A')} · Placed on ${formatDateTime(date)}</div>

      <div class="stat-row">
        <div class="stat">
          <div class="stat-val">${items.length}</div>
          <div class="stat-label">Item Types</div>
        </div>
        <div class="stat">
          <div class="stat-val">${items.reduce((a, item) => a + item.quantity, 0)}</div>
          <div class="stat-label">Total Units</div>
        </div>
        <div class="stat">
          <div class="stat-val">$${formatAmount(amount)}</div>
          <div class="stat-label">Order Value</div>
        </div>
      </div>

      <table class="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items.map((item) => `
            <tr>
              <td>${escapeHtml(item.product?.name || 'Product')}</td>
              <td>${item.quantity}</td>
              <td>$${formatAmount(item.product?.offerPrice || 0)}</td>
              <td>$${formatAmount((item.product?.offerPrice || 0) * item.quantity)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="address-box">
        <div class="address-label">Ship To</div>
        <div class="address-text">
          ${getAddressBlock(address)}
        </div>
      </div>

      <p style="color:#62687a;font-size:13px;">Payment: <strong>Cash on Delivery · Pending</strong></p>
    </div>
    <div class="footer">
      <div class="footer-text">Shounen Trendz Seller Dashboard · Internal Notification</div>
    </div>
  </div>
</body>
</html>
`