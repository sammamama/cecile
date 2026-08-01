import * as React from "react";
import { MERCH } from "@/app/merch/merch";

interface MerchInquiryEmailProps {
  name: string;
  email: string;
  size: string;
  quantity: number;
  message: string;
}

export function MerchInquiryEmail({
  name,
  email,
  size,
  quantity,
  message,
}: MerchInquiryEmailProps) {
  const total = MERCH.price * quantity;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#171717", lineHeight: 1.6 }}>
      <h2 style={{ margin: "0 0 16px", fontWeight: 500 }}>New merch enquiry</h2>

      <p style={{ margin: "0 0 4px" }}>
        Hi Cécile, I&apos;d like to order the <strong>{MERCH.name}</strong>.
      </p>

      <table style={{ margin: "16px 0", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "2px 16px 2px 0" }}>Size</td>
            <td style={{ padding: "2px 0" }}>
              <strong>{size}</strong>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "2px 16px 2px 0" }}>Quantity</td>
            <td style={{ padding: "2px 0" }}>
              <strong>{quantity}</strong>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "2px 16px 2px 0" }}>Total</td>
            <td style={{ padding: "2px 0" }}>
              <strong>
                {total} {MERCH.currency}
              </strong>{" "}
              ({MERCH.priceNote})
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ margin: "0 0 4px" }}>
        <strong>From:</strong> {name} — {email}
      </p>

      {message ? (
        <>
          <p style={{ margin: "16px 0 8px" }}>
            <strong>Message</strong>
          </p>
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{message}</p>
        </>
      ) : null}

      <p style={{ margin: "24px 0 0", fontSize: 13, color: "#737373" }}>
        Reply to this email to reach {name} directly.
      </p>
    </div>
  );
}
