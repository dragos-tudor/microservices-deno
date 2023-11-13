
export const createHealthResultDto = (
  isIdentityApiHealth,
  isLoansApiHealth,
  isNotificationsApiHealth,
) =>
  Object.freeze({
    isIdentityApiHealth,
    isLoansApiHealth,
    isNotificationsApiHealth,
  });
