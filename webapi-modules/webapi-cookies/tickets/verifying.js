
export const isCookieTicketExpired = (ticket, currentDate) => ticket.expiresAt < currentDate