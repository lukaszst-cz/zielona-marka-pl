// SMTP adapter recovered from the verified 19 October implementation.
// Fixed existing account and recipient; credentials stay in Cloudflare secrets.
export async function sendSmtpInquiry(data: { id?: number; name: string; email: string; company: string; message: string; title?: string }, runtime: { SMTP_PASSWORD?: string }) {
  if (!runtime.SMTP_PASSWORD) throw new Error("SMTP is not configured.");
  const recipient = "lukasz.staniewicz@gmail.com";
  const subject = `Zielona Marka: ${data.title || "nowe zapytanie"}${data.id ? ` [nr ${data.id}]` : ""}`;
    const { createTransport } = await import("nodemailer");
    const { connect } = await import("cloudflare:sockets");
    const { Duplex } = await import("node:stream");
    const transport = createTransport({
      host: "poczta2698619.home.pl", port: 465, secure: true,
      auth: { user: "kontakt@zielona-marka.pl", pass: runtime.SMTP_PASSWORD },
      connectionTimeout: 15000, greetingTimeout: 10000, socketTimeout: 20000,
      disableFileAccess: true, disableUrlAccess: true,
      // Workers' native TLS sockets avoid Node-specific DNS/socket options.
      getSocket(_options, callback) {
        const socket = connect({ hostname: "poczta2698619.home.pl", port: 465 }, { secureTransport: "on", allowHalfOpen: false });
        socket.opened.then(() => {
          const connection = Duplex.fromWeb({ readable: socket.readable, writable: socket.writable } as Parameters<typeof Duplex.fromWeb>[0]);
          connection.pause();
          let timeout: ReturnType<typeof setTimeout> | undefined;
          const smtpSocket = Object.assign(connection, {
            setTimeout(milliseconds: number, listener?: () => void) {
              if (timeout) clearTimeout(timeout);
              if (listener) connection.once("timeout", listener);
              if (milliseconds > 0) timeout = setTimeout(() => connection.emit("timeout"), milliseconds);
              return smtpSocket;
            },
          });
          connection.once("close", () => { if (timeout) clearTimeout(timeout); void socket.close().catch(() => {}); });
          callback(null, { connection: smtpSocket as unknown as import("node:net").Socket, secured: true });
        }).catch((error: Error) => { void socket.close().catch(() => {}); callback(error, {}); });
      },
    });
    try {
      const result = await transport.sendMail({
        from: { name: "Zielona Marka", address: "kontakt@zielona-marka.pl" },
        to: recipient, replyTo: data.email, subject, text: `Imię: ${data.name}\nE-mail: ${data.email}\nFirma: ${data.company || "nie podano"}\n\n${data.message}`,
      });
      if (!result.accepted.some((address: string) => address.toLowerCase() === recipient)) {
        throw new Error("SMTP did not accept the recipient");
      }
      return "smtp_accepted";
    } finally {
      transport.close();
    }

}
